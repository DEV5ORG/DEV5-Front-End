import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  Button,
  Dimensions,
  StyleSheet,
} from "react-native";
import Slider from "@react-native-community/slider";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const cardWidth = (width - 60) / 2;

const eventData = [
  { id: "1", name: "Spacex Center", price: 20000, image: null },
  { id: "2", name: "Soho Venue", price: 300000, image: null },
  { id: "3", name: "Bowling Alley", price: 150000, image: null },
  { id: "4", name: "Garden Venue", price: 200000, image: null },
];

type Category = "Lugares" | "Comidas" | "Otros";
const icons: Record<Category, keyof typeof MaterialIcons.glyphMap> = {
  Lugares: "location-city",
  Comidas: "fastfood",
  Otros: "casino",
};

const CreateEvent = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("Lugares");
  const [people, setPeople] = useState(100);
  const [budget, setBudget] = useState(225000);
  console.log("event")
  const filteredEvents = eventData.filter(
    (item) =>
      item.price <= budget &&
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "Lugares"
        ? item.name.toLowerCase().includes("venue")
        : true)
  );

  const renderSlider = (
    iconName: keyof typeof MaterialIcons.glyphMap,
    value: number,
    setValue: (val: number) => void,
    min: number,
    max: number,
    step: number
  ) => (
    <View style={styles.sliderWrapper}>
      <MaterialIcons
        name={iconName}
        size={28}
        color="black"
        style={styles.sliderIcon}
      />
      <Slider
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={setValue}
        style={styles.slider}
        minimumTrackTintColor="#3b5ba9"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#3b5ba9"
      />
      <View style={styles.sliderValue}>
        <Text style={styles.sliderValueText}>{value.toLocaleString()}</Text>
      </View>
    </View>
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
      {category === "Lugares" && (
        <>
          {/* Sliders */}
          {renderSlider("person", people, setPeople, 0, 500, 1)}
          {renderSlider("attach-money", budget, setBudget, 0, 500000, 1000)}
        </>
      )}

      {/* Event Cards */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 10,
        }} // Espacio y márgenes laterales
        columnWrapperStyle={{
          justifyContent: "space-between", // Espaciado entre columnas
        }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardImage}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.image} />
              ) : (
                <View style={styles.noImage} />
              )}
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardPrice}>
                ₡{item.price.toLocaleString()}
              </Text>

              <Pressable
                style={styles.button}
                onPress={() => console.log("Seleccionado:", item)} //todo
              >
                <Text style={styles.buttonText}>Seleccionar</Text>
              </Pressable>
            </View>
          </View>
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
  sliderWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sliderIcon: { marginRight: 10 },
  slider: { flex: 1, height: 40 },
  sliderValue: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 15,
    marginLeft: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  sliderValueText: { fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "48%",
    marginBottom: 16,
  },
  cardImage: {
    width: "100%",
    height: 110,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  noImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ccc",
  },
  cardContent: {
    padding: 12,
    alignItems: "center",
  },
  cardPrice: {
    color: "green",
    fontWeight: "bold",
    fontSize: 14,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3F9FC0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default CreateEvent;
