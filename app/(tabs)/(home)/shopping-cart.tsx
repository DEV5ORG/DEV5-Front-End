import BudgetChart from "@/components/budget-chart";
import CartItem from "@/components/cart-item";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/Colors";
import { useStores } from "@/context/root-store-provider";
import useShoppingCart from "@/hooks/use-shopping-cart";
import { ServiceCategory } from "@/interfaces/service-category";
import { createEvent } from "@/services/events.service";
import { formatEventDate } from "@/utils/date.utils";
import { useRouter } from "expo-router";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Pressable } from "react-native";

const ShoppingCart = observer(() => {
  const [creatingEvent, setCreatingEvent] = useState(false);
  const { eventStore, toastStore, authStore } = useStores();
  const router = useRouter();
  const { hasItems, items, event, groupedByCategory } = eventStore;
  const { eventName, date, startTime, endTime, location } = event;
  const { categoryPercentages, eventDurationHours, total } = useShoppingCart({
    event,
    items: toJS(items),
  });

  const handleCreateEvent = async () => {
    setCreatingEvent(true);
    try {
      eventStore.setEvent({
        totalCost: total,
        userId: Number(authStore.user?.id),
      });
      const payload = eventStore.buildCreateEventPayload();
      await createEvent(payload);
      toastStore.addToast("Evento creado.", "success");
      eventStore.resetStore();
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toastStore.addToast(error.message, "error");
      }
    } finally {
      setCreatingEvent(false);
    }
  };

  const isCreateDisabled =
    creatingEvent || !hasItems || !eventName || !location;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText style={styles.header}>Confirmar Evento</ThemedText>
        <View style={styles.cardContainer}>
          <BudgetChart
            data={[
              {
                label: "Lugar",
                percentage: categoryPercentages.Lugar,
                color: "#26C6DA",
              },
              {
                label: "Comida",
                percentage: categoryPercentages.Comida,
                color: "#3F51B5",
              },
              {
                label: "Entretenimiento",
                percentage: categoryPercentages.Otros,
                color: "#B39DDB",
              },
            ]}
            total={Number(total.toFixed(2))}
          />
        </View>
        <View style={styles.cardContainer}>
          <ThemedText style={styles.detailsTitle}>
            Detalles del Evento
          </ThemedText>

          <Detail label="Nombre" value={eventName || "Por definir"} />
          <Detail
            label="Fecha"
            value={formatEventDate(date, startTime, endTime)}
          />
          <Detail label="Lugar" value={location || "Por definir"} />

          {hasItems ? (
            Object.entries(groupedByCategory).map(([category, services]) => (
              <CartItem
                key={category}
                category={category as ServiceCategory}
                eventDurationHours={eventDurationHours}
                services={services}
              />
            ))
          ) : (
            <ThemedText style={styles.italicText}>
              Tu carrito está vacío.
            </ThemedText>
          )}
        </View>
      </ScrollView>
      <View style={styles.stickyButtonContainer}>
        <Pressable
          style={[styles.button, isCreateDisabled && styles.disabledButton]}
          onPress={() => {
            handleCreateEvent();
          }}
          disabled={isCreateDisabled}
        >
          <Text
            style={[
              styles.stickyButtonText,
              isCreateDisabled && styles.disabledText,
            ]}
          >
            {creatingEvent ? "Creando Evento..." : "Crear Evento"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
});

const Detail = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.itemContainer}>
    <ThemedText style={styles.itemLabel}>{label}:</ThemedText>
    <ThemedText>{value}</ThemedText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 60,
  },
  emptyContainer: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  italicText: {
    fontStyle: "italic",
  },
  header: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  cardContainer: {
    backgroundColor: Colors.gray3,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  detailsTitle: {
    fontWeight: "500",
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    paddingBottom: 4,
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
  },
  itemLabel: {
    fontWeight: "500",
    fontSize: 16,
  },
  stickyButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  button: {
    backgroundColor: Colors.turquoise,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: "auto",
    width: "100%",
    borderRadius: 30,
    maxWidth: 200,
  },
  disabledButton: {
    backgroundColor: Colors.disabledButtonBg,
  },
  disabledText: {
    color: Colors.disabledButtonText,
  },
  stickyButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
});

export default ShoppingCart;
