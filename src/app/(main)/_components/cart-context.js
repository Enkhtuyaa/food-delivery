"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const data = JSON.parse(saved);
      if (Array.isArray(data)) {
        setCart(data.filter((item) => item._id && Number(item.quantity) > 0));
      }
    } catch (error) {
      console.error("Cart уншихад алдаа гарлаа", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Cart хадгалахад алдаа гарлаа", error);
    }
  }, [cart, isLoaded]);

  const addToCart = (food, amount = 1) => {
    const qty = Number(amount);
    const add = Number.isFinite(qty) && qty > 0 ? qty : 1;

    setCart((prev) => {
      const existing = prev.find((item) => item._id === food._id);
      if (existing) {
        return prev.map((item) =>
          item._id === food._id
            ? { ...item, quantity: (Number(item.quantity) || 0) + add }
            : item,
        );
      }

      const price = parsePrice(food.price);
      if (price === null) {
        console.error("Буруу үнэтэй бараа:", food);
        return prev; // сагсанд нэмэхгүй
      }
      return [...prev, { ...food, price, quantity: add }];
    });
  };

  const parsePrice = (value) => {
    const price = Number(value);
    return Number.isFinite(price) && price >= 0 ? price : null;
  };

  const setQuantity = (food, quantity) => {
    const qty = Number(quantity);
    if (!Number.isFinite(qty) || qty <= 0) {
      setCart((prev) => prev.filter((item) => item._id !== food._id));
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item._id === food._id);
      if (existing) {
        return prev.map((item) =>
          item._id === food._id ? { ...item, quantity: qty } : item,
        );
      }

      const price = parsePrice(food.price);
      if (price === null) {
        console.error("Буруу үнэтэй бараа:", food);
        return prev;
      }
      return [...prev, { ...food, price, quantity: qty }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const totalCount = cart.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, setQuantity, removeFromCart, totalCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
