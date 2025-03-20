import ISignInResponse, {
  ISignUpResponse,
} from "@/interfaces/responses/sign-in.interface";
import api from "./axios-instance";
import ICreateUserPayload from "@/interfaces/requests/create-user.interface";
import axios from "axios";

export const signIn = async (email: string, password: string) => {
  try {
    const { data } = await api.post<ISignInResponse>("/api/login", {
      // Se hace esta asignación así porque el BE espera los campos en español.
      // Para mantener el orden en el proyecto de FE, usar inglés a como se usa globalmente
      correoElectronico: email,
      contraseña: password,
    });
    return data;
  } catch (error) {
    throw new Error("Credenciales inválidas ");
  }
};

export const signUp = async (userPayload: ICreateUserPayload) => {
  const { name, email, password, role } = userPayload;
  const signUpUserPayload = {
    nombre: name,
    correoElectronico: email,
    contraseña: password,
    role: role,
  };
  try {
    const { data } = await api.post<ISignUpResponse>(
      "/api/register",
      signUpUserPayload
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || error.response?.data;
      if (
        typeof errorMessage === "string" &&
        errorMessage.includes("duplicate key value violates unique constraint")
      ) {
        throw new Error("El correo electrónico ya está registrado.");
      }

      throw new Error(errorMessage || "Error al registrar usuario.");
    } else {
      throw new Error("Ocurrió un error desconocido.");
    }
  }
};
