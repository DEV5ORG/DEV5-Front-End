import { makeAutoObservable } from "mobx";
import * as SecureStore from "expo-secure-store";
import { RootStore } from "./root-store";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/interfaces/user.interface";
import { STORE_TOKEN_ITEM_NAME } from "@/constants/constants";
import IJwtDecodedData from "@/interfaces/jwt-decode.interface";

interface IPasswordResetDataFlow {
  email: string;
  recoveryToken: string;
}

const defaultPasswordResetDataFlow: IPasswordResetDataFlow = {
  email: "",
  recoveryToken: "",
};

export class AuthStore {
  root: RootStore;
  user: IUser | null = null;
  private token: string | null = null;
  isLoading = true;
  passwordResetDataFlow = defaultPasswordResetDataFlow;

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

  setPasswordResetDataFlow(data: Partial<IPasswordResetDataFlow>) {
    (Object.keys(data) as (keyof IPasswordResetDataFlow)[]).forEach((key) => {
      const value = data[key];
      if (value !== undefined) {
        this.passwordResetDataFlow[key] = value;
      }
    });
  }

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
      const { sub: email, nombre, role, id } = jwtDecode<IJwtDecodedData>(token);
      await SecureStore.setItemAsync(STORE_TOKEN_ITEM_NAME, token);
      this.setToken(token);
      this.setUser({ name: nombre, email: email ?? "", role, id });
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
        const { sub: email, nombre, role, id } = jwtDecode<IJwtDecodedData>(token);
        this.setToken(token);
        this.setUser({ name: nombre, email: email ?? "", role, id });
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

  resetPasswordResetDataFlow() {
    this.passwordResetDataFlow = defaultPasswordResetDataFlow;
  }
}
