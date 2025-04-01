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
import { fetchServiceById, searchProducts } from "@/services/product-service";
import { useStores } from "@/context/root-store-provider";

import { useRouter, useLocalSearchParams } from "expo-router";
import { Product } from "@/interfaces/service-product.interface";

const Products = () => {
  const router = useRouter();
  const { id, category } = useLocalSearchParams();
  const { toastStore } = useStores();
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // asegurar  que id y category sean strings
  const idString = Array.isArray(id) ? id[0] : id;
  const categoryString = Array.isArray(category) ? category[0] : category;

  useEffect(() => {
    const loadService = async () => {
      if (!idString) return; // Asegurar que haya un ID válido

      try {
        const fetchedService = await fetchServiceById(idString);
        console.log(fetchedService)
        setItems(fetchedService?.items ?? []);
      } catch (err) {
        toastStore.addToast("Ocurrió un error, inténtelo de nuevo", "error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [idString]);

 /*  const filteredItems: Product[] = items.filter((item: Product) =>
    item.nombre.toLowerCase().includes(search.toLowerCase())
  ); */

  const handlePress = (id: string, quantity?: number) => {
    if (categoryString === "Lugares") {
      router.push(`/select-event-date?id=${id}`);
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
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#90B1BC" />
        </View>
      ) : items.length === 0 ? (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>
            El servicio no tiene productos registrados
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 10 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <ServiceProductCard
              category={categoryString}
              item={item}
              isService={false}
              onPress={handlePress}
            />
          )}
        />
      )}
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
  loaderContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  noItemsContainer: {
    position: "absolute",
    top: "50%",
    left: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  noItemsText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
});

export default Products;
