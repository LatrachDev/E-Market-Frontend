import { api } from "../config/api";

export const getOrders = async (userId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await api.get(`/orders/${userId ? userId : user.id}`);
  return res.data.data;
};

export const getOrdersAdmin = async () => {
  const res = await api.get("/orders");
  return res.data.data;
};

export const deleteOrder = async (id) => {
  const res = await api.delete(`/orders/${id}/soft`);
  return res.data.data;
};

export const updateOrderStatus = async ({ id, newStatus }) => {
  const res = await api.patch(`/orders/${id}/status`, { newStatus });
  return res.data.data;
};

export const createOrder = async (orderData) => {
  const res = await api.post("/orders", orderData);
  return res.data.data.order;
};

export const getDeletedOrders = async () => {
  const res = await api.get("/orders/deleted");
  return res.data.data;
};

export const restoreOrder = async (id) => {
  const res = await api.patch(`/orders/${id}/restore`);
  return res.data.data;
};

export const getSellerOrders = async () => {
  const res = await api.get("/orders/seller");
  return res.data.data;
};
