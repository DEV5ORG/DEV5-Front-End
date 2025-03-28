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
import { getEventsForUser, getAllEvents } from "@/services/events.service"; // ✅ Updated import
/* import { EventCardProps } from "@/interfaces/event-card.interface"; */
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useStores } from "@/context/root-store-provider";
import { getFirstWord } from "@/utils/text.utils";
import { observer } from "mobx-react-lite";

const Home = observer(() => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { authStore } = useStores();
  let user!: any; // Assumes user contains an `id` field
  useNavigation();

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true); // Start loading while fetching data

      try {
        let fetchedEvents;
        if (user?.id) {
          fetchedEvents = await getEventsForUser(user.id); // Fetch events for user if ID is present
        } else {
          fetchedEvents = await getAllEvents(); // Fetch all events if user ID is missing
        }

        console.log(fetchedEvents)

        const mappedEvents = fetchedEvents.map((event: any) => ({
          ...event,
          image: event.imagen,
          title: event.nombreEvento,
          date: event.fechaHoraInicio,
          location: event.ubicacion,
          totalPrice: event.presupuestoFinal,
          isEditable: event.editable,
          // You can add more properties here if necessary
          onEdit: () => handleEventEdit(event.nombreEvento),
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

  const handleEventEdit = (eventTitle: string) => {
    console.log(`Editing event: ${eventTitle}`);
    // navigation.navigate('EditEvent', { eventTitle });
  };

  const handleNewEvent = () => {
    console.log("Navigate to new event creation screen");
    // navigation.navigate('CreateEvent');
  };

  const renderEventCard = (event: any, index: number) => (

    <EventCard
      key={index}
      imagen={event.imagen}
      title={event.title}
      date={event.date}
      location={event.location}
      onEdit={() => handleEventEdit(event.title)}
      isEditable={event.isEditable}
      totalPrice={event.totalPrice}
      food={event.ordenes} // If needed, map this too from the fetched data
      place={event.ordenes} // If needed, map this too from the fetched data
      entertainment={event.ordenes} // If needed, map this too from the fetched data
    />
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
