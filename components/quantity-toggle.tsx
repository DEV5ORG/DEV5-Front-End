import { observer } from "mobx-react-lite";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

interface IQuantityToggleProps {
  quantity: number;
  buttonSyles?: StyleProp<ViewStyle>;
  setQuantity: (number: number) => void;
}

const QuantityToggle = observer(
  ({ quantity, buttonSyles, setQuantity }: IQuantityToggleProps) => {
    return (
      <View style={styles.quantityContainer}>
        <Pressable
          onPress={() => setQuantity(quantity - 1)}
          style={[styles.quantityButton, buttonSyles]}
        >
          <Text style={styles.boldText}>-</Text>
        </Pressable>
        <Text style={styles.quantity}>{quantity}</Text>
        <Pressable
          onPress={() => setQuantity(quantity + 1)}
          style={[styles.quantityButton, buttonSyles]}
        >
          <Text style={styles.boldText}>+</Text>
        </Pressable>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EEEEEE",
    borderRadius: 50,
  },
  quantityButton: {
    backgroundColor: "#ddd",
    padding: 4,
    borderRadius: 50,
    minWidth: 30,
    alignItems: "center",
  },
  quantity: {
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 10,
    textAlign: "center",
  },
  boldText: {
    fontWeight: "900",
  },
});

export default QuantityToggle;
