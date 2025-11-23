import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import { toast } from "react-toastify";
import { setCart, addItem, removeItem, updateQuantity, clearCart } from "../features/cartSlice";

export const useCart = (userId) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const cartRedux = useSelector(state => state.cart);

  const basePath = userId ? "/cart" : "/guest-cart";
  const queryKey = ["cart", userId ?? "guest"];

  // --- Fetch cart from API ---
  const fetchCart = async () => {
    const res = await api.get(basePath);
    return res.data.data;
  };

  const cartQuery = useQuery({
    queryKey,
    queryFn: fetchCart,
    enabled: !!userId,
    onSuccess: (cart) => {
      dispatch(setCart(cart)); // ✅ On met à jour Redux avec le panier du backend
    },
    onError: () => toast.error("Impossible de charger le panier"),
  });

  const invalidateCart = () => queryClient.invalidateQueries(queryKey);

  // --- Add to cart ---
  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }) => api.post(basePath, { productId, quantity }),
    onSuccess: (res) => {
      invalidateCart();
      toast.success(res.data.message || "Produit ajouté !");
      dispatch(addItem({ ...res.data.item })); // Met à jour Redux
    },
  });

  // --- Update quantity ---
  const updateQuantityMutation = useMutation({
    mutationFn: ({ productId, quantity }) => api.put(basePath, { productId, quantity }),
    onSuccess: (res) => {
      invalidateCart();
      toast.success(res.data.message || "Quantité mise à jour !");
      dispatch(updateQuantity({ id: productId, quantity })); // Met à jour Redux
    },
  });

  // --- Remove item ---
  const removeItemMutation = useMutation({
    mutationFn: ({ productId }) => api.delete(basePath, { data: { productId } }),
    onSuccess: (res) => {
      invalidateCart();
      toast.success(res.data.message || "Produit supprimé !");
      dispatch(removeItem(productId));
    },
  });

  // --- Clear cart ---
  const clearCartMutation = useMutation({
    mutationFn: () => api.delete(`${basePath}/clear`),
    onSuccess: (res) => {
      invalidateCart();
      toast.success(res.data.message || "Panier vidé !");
      dispatch(clearCart());
    },
  });

  return {
    cart: cartRedux, // ✅ On expose Redux pour le rendu
    isLoading: cartQuery.isLoading,
    isError: cartQuery.isError,
    addToCart: addToCartMutation,
    updateQuantity: updateQuantityMutation,
    removeItem: removeItemMutation,
    clearCart: clearCartMutation,
  };
};
