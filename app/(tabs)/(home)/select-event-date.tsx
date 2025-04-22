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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Colors } from "@/constants/Colors";
import { observer } from "mobx-react-lite";
import { useStores } from "@/context/root-store-provider";
import useForm from "@/hooks/use-form";
import CustomTextInput from "@/components/custom-text-input";

interface EventForm {
  activityName: string;
  guestCount: number;
  date: Date;
  startTime: Date;
  endTime: Date;
}

const SelectEventDate = observer(() => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
  const [pickerTarget, setPickerTarget] = useState("");
  const router = useRouter();
  const { eventStore } = useStores();

  const { formValues, setFieldValue, handleSubmit, errors } =
    useForm<EventForm>({
      defaultValues: {
        activityName: eventStore.event.eventName,
        guestCount: eventStore.event.guestCount,
        date: eventStore.event.date,
        startTime: eventStore.event.startTime,
        endTime: eventStore.event.endTime,
      },
      preventMultipleSubmissions: true,
      validationSchema: {
        activityName: {
          required: {
            value: true,
            message: "El nombre de la actividad es obligatorio.",
          },
        },
        guestCount: {
          test: {
            value: (value) => {
              return value >= 1;
            },
            message: "Debe de tener al menos 1 invidado.",
          },
        },
      },
    });

  const handleDateChange = (selectedDate: Date) => {
    if (selectedDate) {
      if (pickerTarget === "date") setFieldValue("date", selectedDate as any);
      else if (pickerTarget === "start")
        setFieldValue("startTime", selectedDate as any);
      else if (pickerTarget === "end")
        setFieldValue("endTime", selectedDate as any);
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

  const handleOnNext = async (formData: typeof formValues) => {
    const { activityName, guestCount, date, startTime, endTime } = formData;
    eventStore.setEvent({
      eventName: activityName,
      guestCount,
      date,
      startTime,
      endTime,
    });
    // Redirigir a la página de servicios al filtro de comidas
    router.push(`/(tabs)/(home)/services?categorySelected=${"Comidas"}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Actividad</Text>

      {/* Nombre de la actividad */}
      <CustomTextInput
        label="Nombre de la Actividad"
        error={errors.activityName}
        containerStyle={styles.inputContainer}
        renderTextField={
          <TextInput
            style={styles.input}
            placeholder="Ej. Conferencia de Tecnología"
            placeholderTextColor={Colors.placeholderText}
            value={formValues.activityName}
            onChangeText={(value) => setFieldValue("activityName", value)}
          />
        }
      />
      <CustomTextInput
        label="Cantidad de Invitados"
        error={errors.guestCount}
        containerStyle={styles.inputContainer}
        renderTextField={
          <TextInput
            style={styles.input}
            placeholder="Cuantas personas asisten al evento"
            placeholderTextColor={Colors.placeholderText}
            keyboardType="numeric"
            value={formValues.guestCount?.toString() || ""}
            onChangeText={(value) => setFieldValue("guestCount", value)}
          />
        }
      />
      {/* Selección de fecha */}
      <CustomTextInput
        label="Fecha"
        error={errors.date}
        containerStyle={styles.inputContainer}
        renderTextField={
          <Pressable onPress={() => showDatePicker("date", "date")}>
            <TextInput
              style={styles.input}
              value={formValues.date.toLocaleDateString()}
              editable={false}
              pointerEvents="none"
              placeholder="Seleccionar fecha"
            />
          </Pressable>
        }
      />
      {/* Selección de hora de inicio */}
      <CustomTextInput
        label="Hora de Inicio"
        error={errors.startTime}
        containerStyle={styles.inputContainer}
        renderTextField={
          <Pressable onPress={() => showDatePicker("start", "time")}>
            <TextInput
              style={styles.input}
              value={formatTime(formValues.startTime)}
              editable={false}
              pointerEvents="none"
              placeholder="Seleccionar hora de inicio"
            />
          </Pressable>
        }
      />
      {/* Selección de hora de fin */}
      <CustomTextInput
        label="Hora de Fin"
        error={errors.endTime}
        containerStyle={styles.inputContainer}
        renderTextField={
          <Pressable onPress={() => showDatePicker("end", "time")}>
            <TextInput
              style={styles.input}
              value={formatTime(formValues.endTime)}
              editable={false}
              pointerEvents="none"
              placeholder="Seleccionar hora de fin"
            />
          </Pressable>
        }
      />
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
          onPress={() => handleSubmit(handleOnNext)}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </Pressable>
      </View>
    </View>
  );
});

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
  },
  inputContainer: {
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
