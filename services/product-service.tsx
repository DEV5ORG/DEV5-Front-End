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

export const searchProducts = async (serviceId: string, query: string) => {
  try {
    const { data } = await api.get(`/api/products/search?serviceId=${serviceId}&query=${query}`);
    return data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw new Error("No se pudieron buscar los productos.");
  }
};
