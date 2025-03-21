import api from "./axios-instance";

export const getServices = async () => {
  try {
    const { data } = await api.get("/api/servicios");
    console.log(data)
    return data;
  } catch (error) {
    // Handle error
  }
};
