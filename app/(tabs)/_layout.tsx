import { Tabs, useSegments } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/haptic-tab";
import TabBarBackground from "@/components/ui/tab-bar-background";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { AuthGuard } from "@/components/guards/auth-guard";

export default function TabLayout() {
  const segments = useSegments();

  // Ocultar tabs para la pantalla de carrito, eso da más espacio en pantalla
  const hideTabBar = [...segments].includes("shopping-cart");

  return (
    <AuthGuard>
      <Tabs
        initialRouteName="(home)"
        screenOptions={{
          tabBarActiveTintColor: Colors.tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
        tabBar={hideTabBar ? () => null : undefined}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Eventos",
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(payment)"
          options={{
            title: "Pago",
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="attach-money" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="person" color={color} />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
