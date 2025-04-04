import api from "./axios-instance";

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
