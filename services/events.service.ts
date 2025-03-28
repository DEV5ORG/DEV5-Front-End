import api from "./axios-instance";

export const getEventsForUser = async (userId: string) => {
  try {
    const { data } = await api.get(`/api/eventos/usuario/${userId}`);
    return data;
  } catch (error) {
    console.error("Error fetching events for user:", error);
    throw new Error("Failed to fetch events.");
  }
};

export const getAllEvents = async () => {
  try {
    const { data } = await api.get(`/api/eventos`);
    return data;
  } catch (error) {
    console.error("Error fetching events for user:", error);
    throw new Error("Failed to fetch events.");
  }
};
