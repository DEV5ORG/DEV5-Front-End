import { makeAutoObservable } from "mobx";
import * as SecureStore from "expo-secure-store";
import { RootStore } from "./root-store";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/interfaces/user.interface";
import { STORE_TOKEN_ITEM_NAME } from "@/constants/constants";

export class AuthStore {
  user: IUser | null = null;
  isLoading = true;
  root: RootStore;

  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  async storeSignInData(token: string) {
    try {
      const { sub: email } = jwtDecode(token);
      await SecureStore.setItemAsync(STORE_TOKEN_ITEM_NAME, token);
      this.user = { email: email || "" };
    } catch (error) {
      console.error(error);
    }
  }

  async signOut() {
    await SecureStore.deleteItemAsync(STORE_TOKEN_ITEM_NAME);
    this.user = null;
  }

  async hydrate() {
    try {
      const token = await SecureStore.getItemAsync(STORE_TOKEN_ITEM_NAME);
      if (token) {
        const { sub: email } = jwtDecode(token);
        const { exp } = jwtDecode<{ exp: number }>(token);

        if (exp * 1000 > Date.now()) {
          this.user = {
            email: email || "",
          };
        } else {
          await SecureStore.deleteItemAsync(STORE_TOKEN_ITEM_NAME);
          this.user = null;
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}
