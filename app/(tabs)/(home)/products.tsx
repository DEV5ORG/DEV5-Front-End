import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ServiceProductCard from "@/components/cards/service-product-card";
import {
  fetchProductsByService,
  searchProducts,
} from "@/services/product-service";
import { useStores } from "@/context/root-store-provider";

import { useRouter, useLocalSearchParams } from "expo-router";

const Products = () => {
  const router = useRouter();
  const { id, category } = useLocalSearchParams();
  const { toastStore } = useStores();
  const [search, setSearch] = useState("");

  // asegurar  que id y category sean strings
  const idString = Array.isArray(id) ? id[0] : id;
  const categoryString = Array.isArray(category) ? category[0] : category;

  const foodItems = [
    {
      id: "1",
      name: "Paquete Pizza",
      price: 5000,
      image: "https://media.istockphoto.com/id/1442417585/es/foto/persona-recibiendo-un-pedazo-de-pizza-de-pepperoni-con-queso.jpg?s=2048x2048&w=is&k=20&c=Cv5aMhENoBJ1qNN22LT5oisAPzpyvidx4WfvFggbRmo=",
    },
    {
      id: "2",
      name: "Pizza Peperoni Grande",
      price: 10000,
      image: "https://media.istockphoto.com/id/1442417585/es/foto/persona-recibiendo-un-pedazo-de-pizza-de-pepperoni-con-queso.jpg?s=2048x2048&w=is&k=20&c=Cv5aMhENoBJ1qNN22LT5oisAPzpyvidx4WfvFggbRmo=",
    },
    {
      id: "3",
      name: "Test",
      price: 8000,
      image: "https://media.istockphoto.com/id/1442417585/es/foto/persona-recibiendo-un-pedazo-de-pizza-de-pepperoni-con-queso.jpg?s=2048x2048&w=is&k=20&c=Cv5aMhENoBJ1qNN22LT5oisAPzpyvidx4WfvFggbRmo=",
    },
  ];

  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePress = (id: string, quantity?: number) => {
    console.log(categoryString)
    if (categoryString === "Lugares") {
      router.push(`/(tabs)/(home)/[id]?id=${id}`);
    } else {
      toastStore.addToast("Agregado al carrito");
      console.log("agregar al carrito, ", quantity);
    }
  };
  return (
    <View style={styles.container}>
      {/* Encabezado con imagen TODO*/}

      {/* Barra de búsqueda */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Buscar"
          placeholderTextColor="#666"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
        <Pressable>
          <MaterialIcons name="search" size={28} color="black" />
        </Pressable>
      </View>

      {/* Lista de productos */}

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 10 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <ServiceProductCard
            category={categoryString}
            item={item}
            isService={false}
            onPress={(id, quantity) => handlePress(id, quantity)}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 40,
    elevation: 5,
    marginBottom: 20,
    marginTop: 20,
  },
  input: { flex: 1, fontSize: 18, color: "#000" },
});

export default Products;
