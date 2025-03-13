import { AuthStore } from "@/stores/auth-store";
import { RootStore } from "@/stores/root-store";
import React, { createContext, ReactNode, useContext } from "react";

let store: RootStore | undefined;
const StoreContext = createContext<RootStore | undefined>(undefined);
StoreContext.displayName = "StoreContext";

export function getAuthStore(): AuthStore {
  const rootStore = store;
  if (!rootStore) {
    throw new Error("Rootstore not available");
  }
  return rootStore.authStore;
}

export function useStores() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useRootStore must be used within RootStoreProvider");
  }
  return context;
}

export function RootStoreProvider({ children }: { children: ReactNode }) {
  // Se asegura de que solo se crea una instancia de RootStore (singleton)
  if (!store) {
    store = new RootStore();
  }

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
