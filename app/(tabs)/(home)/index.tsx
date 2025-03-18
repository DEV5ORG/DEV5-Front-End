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
import { fetchEventData } from "@/services/client-events.service";
import { EventCardProps } from "@/interfaces/event-card.interface";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useStores } from "@/context/root-store-provider";

const Home = () => {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { authStore } = useStores();
  const { user } = authStore;
  useNavigation();
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchEventData();
        const mappedEvents = fetchedEvents.map((event) => ({
          ...event,
          onEdit: () => handleEventEdit(event.title),
        }));
        setEvents(mappedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handleEventEdit = (eventTitle: string) => {
    // Here you would handle the edit action
    console.log(`Editing event: ${eventTitle}`);
    // navigation.navigate('EditEvent', { eventTitle });
  };

  const handleNewEvent = () => {
    // Here you would navigate to the create event screen
    router.push("/(tabs)/(home)/services");

  };

  const renderEventCard = (event: EventCardProps, index: number) => (
    <EventCard
      key={index}
      image={event.image}
      title={event.title}
      date={event.date}
      location={event.location}
      onEdit={() => handleEventEdit(event.title)}
      isEditable={event.isEditable}
      totalPrice={event.totalPrice}
      food={event.food}
      place={event.place}
      entertainment={event.entertainment}
    />
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {/* Aqui se va a usar el nombre, de momento el token solo devuelve el email.
          Este comentario es un recordatorio para actualizar cuando los 
          cambios en el BE estén listos. */}
          <ThemedText type="title">Hola {user?.email}</ThemedText>
        </View>
        <TouchableOpacity
          style={styles.newEventButton}
          onPress={handleNewEvent}
        >
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
};

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
