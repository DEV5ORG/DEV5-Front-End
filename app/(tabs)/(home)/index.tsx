import React, { useEffect, useState } from "react";
import {
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/themed-text";
import EventCard from "@/components/cards/event-card";
import { getEventsForUser } from "@/services/events.service"; // ✅ Updated import
import { Colors } from "@/constants/Colors";
import { useStores } from "@/context/root-store-provider";
import { router } from "expo-router";
import { getFirstWord } from "@/utils/text.utils";
import { observer } from "mobx-react-lite";
import { EventCardProps } from "@/interfaces/event-card.interface";

const Home = observer(() => {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { authStore } = useStores();
  const user = authStore.user; // Assumes user contains an `id` field

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true); // Start loading while fetching data

      try {
        let fetchedEvents;
        if (user?.id) {
          fetchedEvents = await getEventsForUser(user.id); // Fetch events for user if ID is present
        } else {
          fetchedEvents = []; // Handle the case where user or user.id is null
        }

        const mappedEvents = fetchedEvents.map((event: any) => ({
          id: event.id? event.id : "", // Safe navigation operator
          title: event.nombreEvento? event.nombreEvento : "", // Safe navigation operator
          image: event.imagen,
          date: event.fechaHoraInicio,
          location: event.ubicacion,
          totalPrice: event.presupuestoFinal,
          isEditable: event.editable,
          // Handle nested 'ordenes' field to map items safely
          orders: (event.ordenes || []).map((order: any) => ({
            orderDate1: order?.fecha1? order.fecha1 : "", // Safe navigation operator
            orderDate2: order?.fecha2? order.fecha2 : "", // Safe navigation operator
            // Handle 'itemsDeOrden' safely by checking if it exists
            items: (order.itemsDeOrden || []).map((item: any) => ({
              itemName: item?.item?.nombre? item.item.nombre: "", // Safe navigation operator
              itemDescription: item?.item?.descripcion? item.item.descripcion: "", // Safe navigation operator
              itemPrice: item?.item?.precio? item.item.precio : "", // Safe navigation operator
              itemLocation: item?.item?.ubicacion?  item.item.ubicacion: "", // Safe navigation operator
              itemImage: item?.item?.imagen? item.item.imagen: "", // Safe navigation operator
              itemQuantity: item?.cantidad? item.cantidad : 0, // Safe navigation operator
              itemTotalPrice: item?.precioTotal? item.precioTotal : 0, // Safe navigation operator
            }))
          }))
        }));

        setEvents(mappedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [user?.id]); // Only run when `user?.id` changes


  const handleNewEvent = () => {
    // Here you would navigate to the create event screen
    router.push("/(tabs)/(home)/services"); // Use the router to navigate to the create event screen
    // navigation.navigate('CreateEvent');
  };

  const renderEventCard = (event: any, index: number) => (
    <EventCard
      key={index}
      imagen={event.image}
      title={event.title}
      date={event.date}
      location={event.location}
      isEditable={event.isEditable}
      totalPrice={event.totalPrice}
      orders={event.orders} // Pass orders to the EventCard if required
      id={event.id}    />
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <ThemedText type="title">
            Hola {getFirstWord(user?.name ?? "")}
          </ThemedText>
        </View>
        <TouchableOpacity style={styles.newEventButton} onPress={handleNewEvent}>
          <ThemedText style={styles.buttonText}>Nuevo Evento</ThemedText>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.activityIndicator} />
        </View>
      ) : (
        <View style={styles.eventsList}>{events.map(renderEventCard)}</View>
      )}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  titleContainer: {
    flex: 1,
  },
  newEventButton: {
    backgroundColor: Colors.blueButton,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
  eventsList: {
    gap: 16,
  },
});

export default Home;
