import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { observer } from "mobx-react-lite";
import { useStores } from "@/context/root-store-provider";

interface IAuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = observer(({ children }: IAuthGuardProps) => {
  const segments = useSegments();
  const router = useRouter();
  const { authStore } = useStores();

  useEffect(() => {
    if (authStore.isLoading) return;

    const inAuthGroup = segments[0] === "(tabs)";
    const inPublicGroup =
      segments[0] === "(public)" || segments[0] === "+not-found";

    if (!authStore.user && !inPublicGroup) {
      router.replace("/(public)/login");
    } else if (authStore.user && inAuthGroup) {
      router.replace("/");
    }
  }, [authStore.user, segments, authStore.isLoading]);

  if (authStore.isLoading) {
    return null;
  }

  return <>{children}</>;
});
