import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getServices } from "@/services/services.service";
import ServiceProductCard from "@/components/cards/service-product-card";
import { useRouter } from "expo-router";

type Category = "Lugares" | "Comidas" | "Otros";
const icons: Record<Category, keyof typeof MaterialIcons.glyphMap> = {
  Lugares: "location-city",
  Comidas: "fastfood",
  Otros: "casino",
};

type Service = {
  id: string;
  name: string;
  category: Category;
  description: string;
  address: string;
  lowestPrice?: number | null;
  image: string | null;
};

const Services = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("Lugares");
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const router = useRouter();
  // Fetch services data from the API when the component mounts
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        if (response) {
          // Map the API response to match the `Service` type
          const mappedServices = response.map((service: any) => ({
            id: service?.id?.toString()?service.id.toString():null, // Ensure id is a string or null
            name: service?.Nombre?service.Nombre:"Sin nombre asignado",
            category: service?.tipoServicio === "Lugares" ? "Lugares" : service.tipoServicio === "Comidas" ? "Comidas" : "Otros",
            description: service?.descripcion || "Sin descripción", // Using the first item for description temporarily
            address: service?.ubicacion?service.ubicacion:"Sin ubicación",
            image: service?.imagen || null,
          }));
          setServicesData(mappedServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []); // Empty dependency array to run once when the component mounts

  const filteredServices = servicesData.filter(
    (service) =>
      service.category === category &&
      service.name.toLowerCase().includes(search.toLowerCase())
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
            style={[styles.categoryButton, category === cat && styles.categoryButtonActive]}
          >
            <MaterialIcons name={icons[cat]} size={30} color="white" />
            <Text style={styles.categoryText}>{cat}</Text>
          </Pressable>
        ))}
      </View>

      {/* Service Cards */}
      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 10,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={({ item }) => (
          <ServiceProductCard item={item} isService={true} onPress={function (id: string, quantity?: number): void {
            router.push(`/(tabs)/(home)/products?id=${id}`);
          } } />
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
    height: 50,
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
    backgroundColor: "#8fa7d6",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 80,
    elevation: 3,
  },
  categoryButtonActive: { backgroundColor: "#3b5ba9" },
  categoryText: { color: "white", fontSize: 14, marginTop: 5 },
});

export default Services;
