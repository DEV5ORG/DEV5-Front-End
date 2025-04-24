import React, { useState, useEffect, useMemo } from "react";
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
import { fetchServiceById } from "@/services/product-service";
import { useStores } from "@/context/root-store-provider";

import { useRouter, useLocalSearchParams } from "expo-router";
import { Product } from "@/interfaces/service-product.interface";
import { ServiceCategory } from "@/interfaces/service-category";

interface ISearchParams {
  id: string;
  category: ServiceCategory;
  serviceName: string;
}

const Products = () => {
  const router = useRouter();
  const {
    id: serviceId,
    category,
    serviceName,
  } = useLocalSearchParams() as unknown as ISearchParams;
  const { toastStore, eventStore } = useStores();
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // asegurar  que serviceId y category sean strings
  const idString = Array.isArray(serviceId) ? serviceId[0] : serviceId;
  const categoryString: ServiceCategory = Array.isArray(category)
    ? category[0]
    : category;

  useEffect(() => {
    const loadService = async () => {
      if (!idString) return; // Asegurar que haya un ID válido

      try {
        const fetchedService = await fetchServiceById(idString);
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
  const filteredItems = useMemo(() => {
    const searchLower = search.toLowerCase();
    return items.filter((item) =>
      [
        item.nombre,
        item.descripcion,
        item.ubicacion,
        item.precio.toString(),
      ].some((field) => field.toLowerCase().includes(searchLower))
    );
  }, [search, items]); // Se recalcula solo cuando search o items cambian

  const handlePress = (
    item: Product,
    quantity?: number,
    isUpdate?: boolean
  ) => {
    if (categoryString === "Lugares") {
      eventStore.setEvent({
        location: item.ubicacion,
        placeHourlyRate: item.precio,
        image: item.imagen,
      });
      router.push(`/select-event-date?id=${serviceId}`);
    } else {
      if (isUpdate) {
        eventStore.updateItemQuantity(Number(serviceId), item.id, quantity!);
        return;
      }
      toastStore.addToast("Agregado al carrito");
      eventStore.addItemToService(
        Number(serviceId),
        item,
        quantity || 1,
        category,
        serviceName
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado con imagen TODO*/}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
        <Text style={styles.backText}>Atrás</Text>
      </Pressable>
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
      ) : filteredItems.length === 0 ? (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>
            {items.length === 0
              ? "El servicio no tiene productos registrados."
              : "No se encontraron resultados para la búsqueda."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false} // Oculta la barra de scroll
          contentContainerStyle={{
            paddingBottom: 25,
            paddingHorizontal: 10,
            paddingTop: 10,
          }}
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
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 40,
    elevation: 5,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
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
    left: 0, // Alineado al borde izquierdo
    right: 0, // Alineado al borde derecho
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  noItemsText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  backText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#000",
  },
});

export default Products;
