import { makeAutoObservable } from "mobx";
import * as SecureStore from "expo-secure-store";
import { RootStore } from "./root-store";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/interfaces/user.interface";
import { STORE_TOKEN_ITEM_NAME } from "@/constants/constants";

export class AuthStore {
  user: IUser | null = null;
  private token: string | null = null;
  isLoading = true;
  root: RootStore;

  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  get isLoggedIn() {
    return this.token != null && !this.isTokenExpired(this.token);
  }

  get authToken() {
    return this.token;
  }

  setUser = (user: IUser | null) => {
    this.user = user;
  };

  setIsLoading = (value: boolean) => {
    this.isLoading = value;
  };

  setToken = (value: string | null) => {
    this.token = value;
  };

  private isTokenExpired(token: string): boolean {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      return exp * 1000 <= Date.now();
    } catch (error) {
      console.error(error);
      return true;
    }
  }

  async storeSignInData(token: string) {
    try {
      const { sub: email } = jwtDecode(token);
      await SecureStore.setItemAsync(STORE_TOKEN_ITEM_NAME, token);
      this.setToken(token);
      this.setUser({ email: email || "" });
    } catch (error) {
      console.error(error);
    }
  }

  async signOut() {
    await SecureStore.deleteItemAsync(STORE_TOKEN_ITEM_NAME);
    this.setUser(null);
    this.setToken(null);
  }

  async hydrate() {
    try {
      const token = await SecureStore.getItemAsync(STORE_TOKEN_ITEM_NAME);
      if (token && !this.isTokenExpired(token)) {
        const { sub: email } = jwtDecode(token);
        this.setToken(token);
        this.setUser({ email: email || "" });
      } else {
        await SecureStore.deleteItemAsync(STORE_TOKEN_ITEM_NAME);
        this.setToken(null);
        this.setUser(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }
}
