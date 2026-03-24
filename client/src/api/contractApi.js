// src/api/contractApi.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

/* Attach JWT token */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ================= CONTRACT APIs ================= */

/* Create cultivation contract */
export const createCultivationContract = async (payload) => {
  const res = await API.post("/contracts/create/cultivation", payload);
  return res.data;
};

/* Buyer sign */
export const buyerSignContract = async (contractId) => {
  const res = await API.post(`/contracts/sign/buyer/${contractId}`);
  return res.data;
};

/* Farmer sign */
export const farmerSignContract = async (contractId) => {
  const res = await API.post(`/contracts/sign/farmer/${contractId}`);
  return res.data;
};

/* Buyer contracts */
export const getBuyerContracts = async () => {
  const res = await API.get("/contracts/buyer/all");
  return res.data.contracts;
};

/* Farmer contracts */
export const getFarmerContracts = async () => {
  const res = await API.get("/contracts/farmer/all");
  return res.data.contracts;
};
export const getContractById = async (id) => {
  const res = await API.get(`/contracts/${id}`);
  return res.data;
};
export const updateContract = async (contractId, updatedData) => {
  const res = await API.put(`/contracts/update/${contractId}`, updatedData);
  return res.data;
};
