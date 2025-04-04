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

const { width } = Dimensions.get("window");
const cardWidth = (width - 60) / 2;

type Category = "Lugares" | "Comidas" | "Otros";
const icons: Record<Category, keyof typeof MaterialIcons.glyphMap> = {
  Lugares: "location-city",
  Comidas: "fastfood",
  Otros: "casino",
};

const Services = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("Lugares");
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const { categorySelected } = useLocalSearchParams();
  const [loading, setLoading] = useState(true); // Estado para el loader
  const router = useRouter();

  useEffect(() => {
    if (categorySelected) {
      setCategory(categorySelected as Category);
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

  const handlePress = (id: string, category: string) => {
    console.log("Servicio seleccionado:", id, " categoria: ", category);

    router.push(`/products?id=${id}&category=${category}`);
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
        {(["Lugares", "Comidas", "Otros"] as Category[]).map((cat) => (
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
            paddingBottom: 25,
            paddingHorizontal: 10,
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          renderItem={({ item }) => (
            <ServiceProductCard
              item={item}
              isService={true}
              onPress={() => handlePress(item.id, item.tipoServicio)}
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
    padding: 20,
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
    marginBottom: 20,
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

export default Services;
