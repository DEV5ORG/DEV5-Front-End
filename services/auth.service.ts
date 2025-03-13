import ISignInResponse from "@/interfaces/responses/sign-in.interface";
import api from "./axios-instance";

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
    console.log(error);
    throw new Error("Credenciales inválidas ");
  }
};
