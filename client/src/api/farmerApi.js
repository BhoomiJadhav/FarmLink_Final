import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

export const getFarmerById = async (farmerId) => {
  const res = await API.get(`/farmer/${farmerId}`);
  return res.data;
};
