import api from "./axios-instance";

export const fetchServiceById = async (serviceId: string) => {
  try {
    const { data } = await api.get(`/api/servicios/${serviceId}`);
    return data;
  } catch (error) {
    console.error("Error fetching service by ID:", error);
    throw new Error("Error al cargar los datos .");
  }
};
