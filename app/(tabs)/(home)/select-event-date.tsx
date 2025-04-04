import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Colors } from "@/constants/Colors";

const SelectEventDate = () => {
  const router = useRouter();
  const { id, category } = useLocalSearchParams();

  const [activityName, setActivityName] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
  const [pickerTarget, setPickerTarget] = useState("");

  const handleDateChange = (selectedDate: Date) => {
    if (selectedDate) {
      if (pickerTarget === "date") setDate(selectedDate);
      else if (pickerTarget === "start") setStartTime(selectedDate);
      else if (pickerTarget === "end") setEndTime(selectedDate);
    }
    setDatePickerVisibility(false);
  };

  const showDatePicker = (
    target: "date" | "start" | "end",
    mode: "date" | "time"
  ) => {
    setPickerMode(mode);
    setPickerTarget(target);
    setDatePickerVisibility(true);
  };
 // Función para formatear la hora a formato de 12 horas (AM/PM)
 const formatTime = (time: Date) => {
    return time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Actividad</Text>

      {/* Nombre de la actividad */}
      <Text style={styles.label}>Nombre de la Actividad</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Conferencia de Tecnología"
        placeholderTextColor={Colors.placeholderText}
        value={activityName}
        onChangeText={setActivityName}
      />

      {/* Selección de fecha */}
      <Text style={styles.label}>Fecha</Text>
      <Pressable onPress={() => showDatePicker("date", "date")}>
        <TextInput
          style={styles.input}
          value={date.toLocaleDateString()}
          editable={false}
          pointerEvents="none"
          placeholder="Seleccionar fecha"
        />
      </Pressable>

      {/* Selección de hora de inicio */}
      <Text style={styles.label}>Hora de Inicio</Text>
      <Pressable onPress={() => showDatePicker("start", "time")}>
        <TextInput
          style={styles.input}
          value={formatTime(startTime)}
          editable={false}
          pointerEvents="none"
          placeholder="Seleccionar hora de inicio"
        />
      </Pressable>

      {/* Selección de hora de fin */}
      <Text style={styles.label}>Hora de Fin</Text>
      <Pressable onPress={() => showDatePicker("end", "time")}>
        <TextInput
          style={styles.input}
          value={formatTime(endTime)}
          editable={false}
          pointerEvents="none"
          placeholder="Seleccionar hora de fin"
        />
      </Pressable>

      {/* DateTimePickerModal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={pickerMode}
        display={Platform.OS === "ios" ? "spinner" : "default"}
        minimumDate={pickerTarget === "date" ? new Date() : undefined}
        onConfirm={handleDateChange}
        onCancel={() => setDatePickerVisibility(false)}
        locale={pickerMode === "date" ? "es_ES" : undefined}
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
        
      />

      {/* Botones de navegación */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: Colors.gray }]}
          onPress={() => router.push("/(tabs)/(home)/services")}
        >
          <Text style={styles.buttonText}>Atrás</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: Colors.blueButton }]}
          onPress={() => {
        
            router.push(`/(tabs)/(home)/services?categorySelected=${"Comidas"}`); // Redirigir a la página de servicios al filtro de comidas
          }}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.text,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.labelText,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: Colors.inputBackground,
    color: Colors.inputText,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SelectEventDate;
