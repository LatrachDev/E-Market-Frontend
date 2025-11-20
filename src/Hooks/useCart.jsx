import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API_ENDPOINTS, { api } from "../config/api";

export default function useCart(userId) {
    return useQuery({
        queryKey: ["cart", userId],
        queryFn: async () => {
            const res = await api.get(`${API_ENDPOINTS.CART.GET_ALL}`);
            return res.data.data;
        },
        // temps où les données sont fraîches donc pas de refetch
        staleTime: 5 * 60 * 1000,
    });
}


export function useAddToCart(userId) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (item) => api.post(`${API_ENDPOINTS.CART}?userId=${userId}`, item),
        onSuccess: () => queryClient.invalidateQueries(["cart", userId]),
    });
}

export function useUpdateCartItem(userId) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ productId, quantity }) =>
            api.patch(`${API_ENDPOINTS.CART}?userId=${userId}`, { productId, quantity }),
        onSuccess: () => queryClient.invalidateQueries(["cart", userId]),
    });
}

export function useRemoveCartItem(userId) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (productId) =>
            api.delete(`${API_ENDPOINTS.CART}?userId=${userId}`, { data: { productId } }),
        onSuccess: () => queryClient.invalidateQueries(["cart", userId]),
    });
}

export function useClearCart(userId) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => api.post(`${API_ENDPOINTS.CART}/clear?userId=${userId}`),
        onSuccess: () => queryClient.invalidateQueries(["cart", userId]),
    });
}
