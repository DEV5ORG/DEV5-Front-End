import HeaderLeftIcon from "@/components/navigation/header-left-icon";
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
        name="createEvent"
        options={{
          headerTitle: () => <ThemedText>Crear Evento</ThemedText>,
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
