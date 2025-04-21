import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CardProps, Product } from "@/interfaces/service-product.interface";
import { useStores } from "@/context/root-store-provider";
import QuantityToggle from "../quantity-toggle";
import { observer } from "mobx-react-lite";

const ServiceProductCard: React.FC<CardProps> = observer(
  ({ category, item, isService, onPress }) => {
    const { eventStore } = useStores();
    const existingItem = eventStore.getItemByItemId(item.id);
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

          <View style={styles.cardActions}>
            {!isService && category === "Comidas" ? (
              !existingItem?.quantity ? (
                <Pressable
                  style={styles.button}
                  onPress={() => onPress(item as Product, 1)}
                >
                  <Text style={styles.buttonText}>Agregar</Text>
                </Pressable>
              ) : (
                <QuantityToggle
                  quantity={existingItem?.quantity!}
                  setQuantity={(quantity) =>
                    onPress(item as Product, quantity, true)
                  }
                />
              )
            ) : !isService && existingItem ? (
              <Text style={styles.inCart}>Ya en carrito</Text>
            ) : (
              <Pressable
                style={styles.button}
                onPress={() => onPress(item as Product)}
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
      </View>
    );
  }
);

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
  inCart: {
    fontWeight: "bold",
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
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
    width: "100%",
  },
  button: {
    backgroundColor: "#3F9FC0",
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: "100%",
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
});

export default ServiceProductCard;
