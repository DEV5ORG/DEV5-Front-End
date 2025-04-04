import { AuthGuard } from "@/components/guards/auth-guard";
import Toast from "@/components/toast";
import { RootStoreProvider, useStores } from "@/context/root-store-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayoutContent = observer(() => {
  const { authStore } = useStores();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      authStore.hydrate();
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
    <StatusBar style="dark" translucent={false} />
    {/* Toaster accesible globalmente */}
    <Toast />
  </>
  );
});

const RootLayout = observer(() => {
  return (
    <RootStoreProvider>
      <RootLayoutContent />
    </RootStoreProvider>
  );
});

export default RootLayout;
