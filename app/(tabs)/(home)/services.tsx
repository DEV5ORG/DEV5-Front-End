import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import the router
import ServiceProductCard from "@/components/cards/ServiceProductCard";

const { width } = Dimensions.get("window");
const cardWidth = (width - 60) / 2;

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

const servicesData: Service[] = [
  {
    id: "1",  // Changed from serviceId to id
    name: "Spacex Center",
    category: "Lugares",
    description: "A cool place for events",
    address: "Somewhere",
    lowestPrice: 5000,
    image: null,
  },
  {
    id: "2",  // Changed from serviceId to id
    name: "Soho Venue",
    category: "Lugares",
    description: "An amazing venue",
    address: "Somewhere else",
    lowestPrice: 10000,
    image: null,
  },
  {
    id: "3",  // Changed from serviceId to id
    name: "Gourmet Bistro",
    category: "Comidas",
    description: "A fine dining experience",
    address: "Foodie street",
    lowestPrice: 5000,
    image: null,
  },
  {
    id: "4",  // Changed from serviceId to id
    name: "Jazz Band",
    category: "Otros",
    description: "Live music performance",
    address: "Music venue",
    lowestPrice: 10000,
    image: null,
  },
];

const Services = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("Lugares");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const router = useRouter();

  const filteredServices = servicesData.filter(
    (service) =>
      service.category === category &&
      service.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleServiceSelect = (service: Service) => {
    // Navigate to the route passed as a parameter with the service ID
    router.push(`/(tabs)/(home)/products?serviceId=${service.id}`);
  };

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
          <ServiceProductCard item={item} isService={true} />
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
