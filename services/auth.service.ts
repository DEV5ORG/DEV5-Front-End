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

// Comentario para recordar actualizar los errores, el API no retorna errores correctos.
// Una vez actualizado el API, usar el error message del API

export const requestPasswordRecovery = async (email: string) => {
  try {
    await api.post("/api/pwd-recovery", { correoElectronico: email });
  } catch (error) {
    throw new Error("Correo inválido");
  }
};

export const validateRecoveryToken = async (token: string) => {
  try {
    await api.get(`/api/validate-token/${token}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message;
      throw new Error(errorMessage || "El código ha expirado o es inválido");
    }
  }
};

export const resetPassword = async (
  token: string,
  email: string,
  password: string
) => {
  try {
    await api.put(`/api/pwd-change/${token}`, {
      correoElectronico: email,
      contraseña: password,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message;
      throw new Error(errorMessage || "Ha ocurrido un error");
    } else {
      throw new Error("Ocurrió un error desconocido.");
    }
  }
};
