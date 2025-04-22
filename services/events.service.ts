import ICreateEventPayload from "@/interfaces/requests/create-event.interface";
import api from "./axios-instance";
import axios from "axios";

export const getEventsForUser = async (userId: string) => {
  try {
    const { data } = await api.get(`/api/eventos/usuario/${userId}`, {
      transformResponse: [(response) => JSON.parse(response)], // Forzar JSON válido
    });
    return data;
  } catch (error) {
    console.error("Error fetching events for user:", error);
    throw new Error("Failed to fetch events.");
  }
};

export const createEvent = async (createEventPayload: ICreateEventPayload) => {
  try {
    await api.post("/api/eventos", createEventPayload);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data;
      throw new Error(errorMessage || "Ha ocurrido un error.");
    }
  }
};
