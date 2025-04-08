import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { observer } from "mobx-react-lite";
import { useStores } from "@/context/root-store-provider";

interface IAuthGuardProps {
  children: React.ReactNode;
}
export const AuthGuard = observer(({ children }: IAuthGuardProps) => {
  const router = useRouter();
  const segments = useSegments();
  const { authStore } = useStores();

  const shouldRedirect = !authStore.isLoading && !authStore.isLoggedIn;

  useEffect(() => {
    if (shouldRedirect) {
      router.replace("/(public)/login");
    }
  }, [segments, shouldRedirect]);

  if (authStore.isLoading || shouldRedirect) {
    return null;
  }

  return <>{children}</>;
});
