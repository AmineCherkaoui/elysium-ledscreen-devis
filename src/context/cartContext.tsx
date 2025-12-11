"use client";

import { Button } from "@/components/ui/button";
import { differenceInDays, isSameDay } from "date-fns";
import { ShoppingCart, X } from "lucide-react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const LOCALSTORAGE_KEY = "panier";
const CART_TIME = 60 * 60 * 1000;

type CartItemAchat = {
  id: string;
  slug: string;
  imageUrl: string | null;
  nom: string;
  type: "achat";
  prix_unitaire: number;
  quantite: number;
};

type CartItemLocation = {
  id: string;
  slug: string;
  imageUrl: string | null;
  nom: string;
  type: "location";
  prix_unitaire: number;
  quantite: number;
  date_debut: string;
  date_fin: string;
};

export type CartItem = CartItemAchat | CartItemLocation;

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (
    id: string,
    type: "achat" | "location",
    date_debut?: string,
    date_fin?: string
  ) => void;
  clearCart: () => void;
  incrementQuantity: (
    id: string,
    type: "achat" | "location",
    date_debut?: string,
    date_fin?: string
  ) => void;
  decrementQuantity: (
    id: string,
    type: "achat" | "location",
    date_debut?: string,
    date_fin?: string
  ) => void;
  getTotal: () => number;
  getItemCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedCart = localStorage.getItem(LOCALSTORAGE_KEY);
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        const now = Date.now();

        if (!parsed.expiresAt || now > parsed.expiresAt) {
          localStorage.removeItem(LOCALSTORAGE_KEY);
        } else {
          setCart(parsed.cart || []);
        }
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (cart.length === 0) {
      localStorage.removeItem(LOCALSTORAGE_KEY);
      return;
    }

    const existingCart = localStorage.getItem(LOCALSTORAGE_KEY);
    let expiresAt: number;

    if (existingCart) {
      try {
        const parsed = JSON.parse(existingCart);
        expiresAt = parsed.expiresAt ?? Date.now() + CART_TIME;
      } catch {
        expiresAt = Date.now() + CART_TIME;
      }
    } else {
      expiresAt = Date.now() + CART_TIME;
    }

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({ expiresAt, cart }));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((cartItems) => {
      let itemExists = false;
      const updatedCart = cartItems.map((cartItem) => {
        if (
          cartItem.type === "achat" &&
          newItem.type === "achat" &&
          cartItem.id === newItem.id
        ) {
          itemExists = true;
          return {
            ...cartItem,
            quantite: cartItem.quantite + newItem.quantite,
          };
        }

        if (
          cartItem.type === "location" &&
          newItem.type === "location" &&
          cartItem.id === newItem.id &&
          isSameDay(cartItem.date_debut, newItem.date_debut) &&
          isSameDay(cartItem.date_fin, newItem.date_fin)
        ) {
          itemExists = true;
          return {
            ...cartItem,
            quantite: cartItem.quantite + newItem.quantite,
          };
        }

        return cartItem;
      });

      const addItemToCart = [...cartItems, newItem];

      return itemExists ? updatedCart : addItemToCart;
    });
  };

  const removeFromCart = (
    id: string,
    type: "achat" | "location",
    date_debut?: string,
    date_fin?: string
  ) => {
    setCart((prev) =>
      prev.filter((item) => {
        if (item.id !== id || item.type !== type) {
          return true;
        }

        if (type === "location" && item.type === "location") {
          return item.date_debut !== date_debut || item.date_fin !== date_fin;
        }
        return false;
      })
    );
  };

  const incrementQuantity = (
    id: string,
    type: "achat" | "location",
    date_debut?: string,
    date_fin?: string
  ) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id || item.type !== type) return item;

        if (type === "location" && item.type === "location") {
          if (item.date_debut === date_debut && item.date_fin === date_fin) {
            return { ...item, quantite: item.quantite + 1 };
          }
          return item;
        }

        if (type === "achat") {
          return { ...item, quantite: item.quantite + 1 };
        }

        return item;
      })
    );
  };

  const decrementQuantity = (
    id: string,
    type: "achat" | "location",
    date_debut?: string,
    date_fin?: string
  ) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id || item.type !== type) return item;

        if (type === "location" && item.type === "location") {
          if (
            item.date_debut === date_debut &&
            item.date_fin === date_fin &&
            item.quantite > 1
          ) {
            return { ...item, quantite: item.quantite - 1 };
          }
          return item;
        }

        if (type === "achat" && item.quantite > 1) {
          return { ...item, quantite: item.quantite - 1 };
        }

        return item;
      })
    );
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      if (item.type === "location") {
        const days = differenceInDays(item.date_fin, item.date_debut) + 1;

        return total + item.prix_unitaire * item.quantite * days;
      }

      return total + item.prix_unitaire * item.quantite;
    }, 0);
  };

  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantite, 0);
  };

  const clearCart = () => {
    setCart([]);
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        incrementQuantity,
        decrementQuantity,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const showCartToast = (nom: string) => {
  toast.custom((t) => (
    <div className="border border-primary-500 text-primary-500 bg-white/80 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg flex items-center gap-4">
      <ShoppingCart size={16} />
      <div className="flex-1">
        <p className="font-semibold text-xs">
          <strong>{nom}</strong> ajouté au panier
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => toast.dismiss(t)}
        className=" rounded-full"
      >
        <X size={16} />
      </Button>
    </div>
  ));
};
