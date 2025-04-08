import api from "./axios-instance";

export const getServices = async () => {
  try {
    const { data } = await api.get("/api/servicios/sin-items");
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};
