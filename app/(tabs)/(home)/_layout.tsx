import HeaderLeftIcon from "@/components/navigation/header-left-icon";
import ShoppingCartIcon from "@/components/shopping-cart-icon";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerLeft: () => <HeaderLeftIcon />,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <ThemedText>Inicio</ThemedText>,
          headerRight: () => (
            <AntDesign size={24} color={Colors.black} name="bells" />
          ),
        }}
      />
      <Stack.Screen
        name="services"
        options={{
          headerTitle: () => <ThemedText>Servicios</ThemedText>,
          headerRight: () => <ShoppingCartIcon />,
        }}
      />
      <Stack.Screen
        name="products"
        options={{
          headerTitle: () => <ThemedText>Productos</ThemedText>,
          headerRight: () => <ShoppingCartIcon />,
        }}
      />
      <Stack.Screen
        name="select-event-date"
        options={{
          headerTitle: () => <ThemedText>Productos</ThemedText>,
        }}
      />
      <Stack.Screen
        name="shopping-cart"
        options={{
          headerTitle: "",
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
