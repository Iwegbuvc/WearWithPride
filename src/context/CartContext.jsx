import React, { createContext, useContext, useState, useEffect } from "react";
import * as cartApi from "../api/cart";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, []);

  async function fetchCart() {
    setLoading(true);
    try {
      const res = await cartApi.getCart();
      setCartItems(
        (res.data.items || res.data.cart?.items || res.data.cartItems || res.data) ?? []
      );
      setTotal(res.data.totalPrice ?? res.data.total ?? 0);
    } catch (e) {
      setCartItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  async function addToCart({
    id,
    name,
    price,
    image,
    quantity = 1,
    size,
    color,
    selectedImage,
  }) {
    setLoading(true);
    try {
      const res = await cartApi.addToCart({
        productId: id,
        quantity,
        size,
        color,
        selectedImage: selectedImage || image,
      });
      setCartItems(res.data.items || []);
      setTotal(res.data.totalPrice ?? 0);
    } finally {
      setLoading(false);
    }
  }

  async function removeFromCart(itemId) {
    setLoading(true);
    try {
      const res = await cartApi.removeCartItem(itemId);
      // Defensive: prefer res.data.items, fallback to res.data.cart?.items, fallback to res.data
      setCartItems(res.data.items || res.data.cart?.items || res.data.cartItems || res.data || []);
      setTotal(res.data.totalPrice ?? res.data.total ?? 0);
    } finally {
      setLoading(false);
    }
  }

  async function updateQuantity(itemId, newQuantity) {
    setLoading(true);
    try {
      const res = await cartApi.updateCartItem(itemId, newQuantity);
      setCartItems(res.data.items || res.data.cart?.items || res.data.cartItems || res.data || []);
      setTotal(res.data.totalPrice ?? res.data.total ?? 0);
    } finally {
      setLoading(false);
    }
  }

  async function clearCart() {
    setLoading(true);
    try {
      await cartApi.clearCart();
      setCartItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        loading,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
