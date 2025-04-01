import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CardProps } from "@/interfaces/service-product.interface";

const ServiceProductCard: React.FC<CardProps> = ({
  category,
  item,
  isService,
  onPress,
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <View style={[styles.card, !isService && styles.foodCard]}>
      {item.imagen ? (
        <Image source={{ uri: item.imagen }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <MaterialIcons name="image" size={40} color="#ccc" />
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.name}>{item.nombre}</Text>

        {/* Mostrar precio solo si NO es un servicio */}
        {!isService && "precio" in item && (
          <Text style={styles.cardPrice}>₡{item.precio}</Text>
        )}

        {isService && item.ubicacion && (
          <Text style={styles.location}>{item.ubicacion}</Text>
        )}

        <Text style={styles.description}>{item.descripcion}</Text>

        {!isService && category === "Comidas" ? (
          <View style={styles.foodActions}>
            <View style={styles.quantityContainer}>
              <Pressable
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                style={styles.quantityButton}
              >
                <Text>-</Text>
              </Pressable>
              <Text style={styles.quantity}>{quantity}</Text>
              <Pressable
                onPress={() => setQuantity(quantity + 1)}
                style={styles.quantityButton}
              >
                <Text>+</Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.button}
              onPress={() => onPress(item.id, quantity)}
            >
              <Text style={styles.buttonText}>Agregar</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={[
              styles.button,
              category !== "Comidas" && styles.fixedButton,
            ]}
            onPress={() => onPress(item.id)}
          >
            <Text style={styles.buttonText}>
              {!isService && category === "Lugares"
                ? "Seleccionar"
                : isService
                ? "Ver Productos"
                : "Agregar"}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5, // Andoid
    width: "48%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  foodCard: {
    paddingBottom: 10,
  },
  image: {
    width: "100%",
    height: 150,
  },
  imagePlaceholder: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  content: {
    padding: 10,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  location: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  cardPrice: {
    color: "green",
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EEEEEE",
    borderRadius: 50,
  },
  quantityButton: {
    backgroundColor: "#ddd",
    padding: 4,
    borderRadius: 50,
    minWidth: 30,
    alignItems: "center",
  },
  quantity: {
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 10,
    textAlign: "center",
  },
  foodActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
    width: "100%",
  },
  button: {
    backgroundColor: "#3F9FC0",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  fixedButton: {
    width: 150,
  },
});

export default ServiceProductCard;
