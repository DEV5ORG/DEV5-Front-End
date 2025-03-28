import api from "./axios-instance";

export const fetchProductsByService = async (serviceId: string) => {
  try {
    const { data } = await api.get(`/api/products?serviceId=${serviceId}`); 
    return data;
  } catch (error) {
    console.error("Error fetching products by service:", error);
    throw new Error("No se pudieron obtener los productos.");
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
