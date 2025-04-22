import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import ServiceProductCard from "@/components/cards/service-product-card";
import { getServices } from "@/services/services.service";
import { Service } from "@/interfaces/service-product.interface";
import { ServiceCategory } from "@/interfaces/service-category";

const { width } = Dimensions.get("window");

const icons: Record<ServiceCategory, keyof typeof MaterialIcons.glyphMap> = {
  Lugares: "location-city",
  Comidas: "fastfood",
  Otros: "casino",
};

const Services = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ServiceCategory>("Lugares");
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const { categorySelected } = useLocalSearchParams();
  const [loading, setLoading] = useState(true); // Estado para el loader
  const router = useRouter();

  useEffect(() => {
    if (categorySelected) {
      setCategory(categorySelected as ServiceCategory);
    }
    const fetchServices = async () => {
      try {
        setLoading(true); // Mostrar el loader antes de cargar
        const response = await getServices();
        if (response) {
          setServicesData(response);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false); // Ocultar el loader cuando termine la carga
      }
    };
    fetchServices();
  }, [categorySelected]); // Empty dependency array to run once when the component mounts

  const handlePress = (
    serviceId: string,
    serviceName: string,
    category: string
  ) => {
    router.push(
      `/products?id=${serviceId}&category=${category}&serviceName=${serviceName}`
    );
  };

  const filteredServices = servicesData.filter(
    (service) =>
      service.tipoServicio === category &&
      [service.nombre, service.descripcion, service.ubicacion].some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
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

      {/* Categories */}
      <View style={styles.categories}>
        {(["Lugares", "Comidas", "Otros"] as ServiceCategory[]).map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setCategory(cat)}
            style={[
              styles.categoryButton,
              category === cat && styles.categoryButtonActive,
            ]}
          >
            <MaterialIcons name={icons[cat]} size={30} color="white" />
            <Text style={styles.categoryText}>{cat}</Text>
          </Pressable>
        ))}
      </View>

      {/* Service Cards */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#90B1BC" />
        </View>
      ) : filteredServices.length === 0 ? (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>
            {servicesData.length === 0
              ? "No hay servicios disponibles en esta categoría."
              : "No se encontraron resultados para la búsqueda."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false} // Oculta la barra de scroll
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 25,
            paddingHorizontal: 10,
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          renderItem={({ item: service }) => (
            <ServiceProductCard
              item={service}
              isService={true}
              onPress={() =>
                handlePress(service.id, service.nombre, service.tipoServicio)
              }
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
    marginVertical: 20,
  },
  input: { flex: 1, fontSize: 18, color: "#000" },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#90B1BC",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 80,
    elevation: 3,
  },
  categoryButtonActive: { backgroundColor: "#3F9FC0" },
  categoryText: { color: "white", fontSize: 14, marginTop: 5 },
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
});

export default Services;
