import { StyleSheet, View, Text } from "react-native";
import { ThemedText } from "./themed-text";
import QuantityToggle from "./quantity-toggle";
import { useStores } from "@/context/root-store-provider";
import { observer } from "mobx-react-lite";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { ServiceCategory } from "@/interfaces/service-category";

interface ICartItemProps {
  category: ServiceCategory;
  eventDurationHours: number;
  services: {
    serviceId: number;
    serviceName: string;
    items: {
      id: string;
      nombre: string;
      precio: number;
      quantity?: number;
    }[];
  }[];
}

const CartItem = observer(
  ({ category, eventDurationHours, services }: ICartItemProps) => {
    const { eventStore } = useStores();

    const updateItemQuantity = (
      serviceId: number,
      itemId: string,
      quantity: number
    ) => {
      eventStore.updateItemQuantity(serviceId, itemId, quantity);
    };

    const getItemTotal = (
      precio: number,
      quantity: number,
      category: string
    ) => {
      const totalMapping = {
        Otros: precio * eventDurationHours * quantity,
        Default: precio * quantity,
      };

      return (
        totalMapping[category as keyof typeof totalMapping] ||
        totalMapping["Default"]
      );
    };

    return (
      <View>
        <ThemedText style={styles.categoryTitle}>{category}</ThemedText>

        {services.map(({ serviceId, serviceName, items }) => (
          <View key={serviceName} style={styles.serviceBlock}>
            <ThemedText style={styles.serviceTitle}>{serviceName}</ThemedText>

            {items.map(({ id: itemId, nombre, precio, quantity = 1 }) => (
              <View key={itemId} style={styles.itemCard}>
                <ThemedText style={styles.itemName}>{nombre}</ThemedText>
                <View style={styles.flexContainer}>
                  <Text>{`${
                    category === "Otros" ? `Hora:` : `Unidad:`
                  } ₡${precio.toFixed(2)}`}</Text>
                  {category === "Comidas" ? (
                    <QuantityToggle
                      quantity={quantity}
                      buttonSyles={styles.counterButton}
                      setQuantity={(quantity) =>
                        updateItemQuantity(serviceId, itemId, quantity)
                      }
                    />
                  ) : (
                    <MaterialIcons
                      name="delete"
                      size={24}
                      onPress={() =>
                        eventStore.removeItemFromService(serviceId, itemId)
                      }
                    />
                  )}
                </View>
                <Text>
                  Total: ₡{getItemTotal(precio, quantity, category).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  categoryTitle: {
    fontWeight: "900",
    marginBottom: 5,
  },
  serviceBlock: {
    marginBottom: 16,
  },
  serviceTitle: {
    fontWeight: "800",
    fontSize: 16,
    borderBottomWidth: 0.3,
    paddingBottom: 10,
  },
  itemCard: {
    paddingVertical: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
  },
  counterButton: {
    backgroundColor: Colors.white,
  },
});

export default CartItem;
