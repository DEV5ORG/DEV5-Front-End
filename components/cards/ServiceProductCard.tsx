import React from "react";
import { View, Text, Image, Pressable, StyleSheet, Dimensions, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type CardProps = {
  item: {
    id: string;
    name: string;
    address?: string;
    description: string;
    image: string | null;
    category?: string;  // Optional, for services like 'Lugares', 'Comidas', etc.
  };
  isService?: boolean; // Indicates whether this is a service or a product card
};

const ServiceProductCard = ({ item, isService }: CardProps) => {
  return (
    <View style={styles.card}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <MaterialIcons name="image" size={40} color="#ccc" />
        </View>
      )}
      <View style={styles.nameHolder}><Text style={styles.name}>{item.name}</Text></View>
      {isService && item.address && <View style={styles.locationHolder}><Text style={styles.location}>{item.address}</Text></View>}
      <View style={styles.descriptionHolder}><Text style={styles.description}>{item.description}</Text></View>
      <Pressable style={styles.button} onPress={() => { }}>
        <Text style={styles.buttonText}>Ver Productos</Text>
      </Pressable>
    </View>
  );
};

// Corrected styles object - only one declaration
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 5,
    width: "48%", // Adjusted width for two cards per row
    marginRight:1, // Ensure separation between cards horizontally
    marginLeft:1, // Ensure separation between cards horizontally
  },
  image: {
    
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  nameHolder: {
    height: 35,
  },
  location: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  locationHolder: {
    height: 30,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  descriptionHolder: {
    height: 50,
    width: "100%",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  // Container for displaying multiple cards
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Ensures the cards are spaced out evenly
  },
});

// CardContainer component to display multiple ServiceProductCards
const CardContainer = ({ items }: { items: CardProps[] }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {items.map((item) => (
        <ServiceProductCard key={item.item.id} item={item.item} isService={item.isService} />
      ))}
    </ScrollView>
  );
};

export default ServiceProductCard;