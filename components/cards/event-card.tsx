import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/Colors";
import { EventCardProps } from "@/interfaces/event-card.interface";
import { formatDate } from "@/utils/date.utils";

const EventCard: React.FC<EventCardProps> = ({
  imagen,
  title,
  date,
  location,
  totalPrice,
  orders,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: imagen }} style={styles.eventImage} />

      <View style={styles.details}>
        <ThemedText type="title" style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText type="subtitle" style={styles.date}>
          {formatDate(date)} {/* Apply the formatted date */}
        </ThemedText>
        <ThemedText type="default" style={styles.location}>
          {location}
        </ThemedText>

        <View style={styles.totalPriceContainer}>
          <ThemedText type="default">
            Total: ₡{totalPrice.toFixed(2)}
          </ThemedText>
        </View>

        {/* Button to toggle the details visibility */}
        <TouchableOpacity
          style={styles.toggleDetailsButton}
          onPress={toggleDetails}
        >
          <ThemedText style={styles.buttonText}>
            {showDetails ? "Menos Detalles" : "Mas Detalles"}
          </ThemedText>
        </TouchableOpacity>

        {/* Toggle the visibility of the order details */}
        {showDetails && orders.length > 0 && (
          <View style={styles.ordersContainer}>
            {orders.map((order, index) => (
              <View key={index} style={styles.order}>
                {order.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.item}>
                    <Text style={styles.bold}>{item.itemName}</Text>
                    <Text>{item.itemDescription}</Text>
                    <Text>Precio por unidad: ₡{item.itemPrice}</Text>
                    <Text>Cantidad: {item.itemQuantity}</Text>
                    <Text>Precio Total: ₡{item.itemTotalPrice.toFixed(2)}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  eventImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  details: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 10,
  },
  totalPriceContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: Colors.blueButton,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  ordersContainer: {
    marginTop: 20,
    paddingLeft: 10,
  },
  order: {
    marginBottom: 15,
  },
  item: {
    marginBottom: 10,
  },
  toggleDetailsButton: {
    backgroundColor: Colors.blueButton,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  orderEnd: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default EventCard;
