import { Colors } from "@/constants/Colors";
import { useStores } from "@/context/root-store-provider";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { StyleSheet, Pressable, View, Animated } from "react-native";

const ShoppingCartIcon = observer(() => {
  const { eventStore } = useStores();
  const router = useRouter();

  const itemCount = eventStore.totalUniqueItems;

  const scaleAnim = useRef(new Animated.Value(itemCount > 0 ? 1 : 0)).current;
  const prevItemCount = useRef(itemCount);

  useEffect(() => {
    if (itemCount > prevItemCount.current) {
      scaleAnim.setValue(0.5);
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
        tension: 100,
      }).start();
    } else if (itemCount === 0) {
      scaleAnim.setValue(0);
    }

    prevItemCount.current = itemCount;
  }, [itemCount]);

  const goToCart = () => {
    router.push("/(tabs)/(home)/shopping-cart");
  };

  return (
    <Pressable onPressOut={goToCart} hitSlop={20}>
      <View style={styles.iconWrapper}>
        <MaterialIcons name="shopping-cart-checkout" size={30} color="black" />
        {itemCount > 0 && (
          <Animated.View
            style={[
              styles.itemsCounter,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          />
        )}
      </View>
    </Pressable>
  );
});

export default ShoppingCartIcon;

const styles = StyleSheet.create({
  iconWrapper: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  itemsCounter: {
    padding: 5,
    right: 0,
    position: "absolute",
    backgroundColor: Colors.green,
    borderRadius: 1000,
  },
});
