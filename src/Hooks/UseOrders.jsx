import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOrders,
  getOrdersAdmin,
  getSellerOrders,
  getDeletedOrders,
  deleteOrder,
  updateOrderStatus,
  createOrder,
  restoreOrder
} from "../services/orders.service";

// =================== FETCH QUERIES ===================

// Client orders
export const useOrders = (userId) => {
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getOrders(userId),
  });
};

// Admin orders
export const useAdminOrders = () => {
  return useQuery({
    queryKey: ["orders-admin"],
    queryFn: getOrdersAdmin,
  });
};

// Seller orders
export const useSellerOrders = () => {
  return useQuery({
    queryKey: ["orders-seller"],
    queryFn: getSellerOrders,
  });
};

// Deleted orders
export const useDeletedOrders = () => {
  return useQuery({
    queryKey: ["orders-deleted"],
    queryFn: getDeletedOrders,
  });
};

// =================== MUTATIONS ===================

// Delete order
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });
};

// Update order status
export const useUpdateStatusOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });
};

// Create order
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });
};

// Restore order
export const useRestoreOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders-deleted"]);
      queryClient.invalidateQueries(["orders"]);
    },
  });
};
