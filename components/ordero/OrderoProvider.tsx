"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ORDERO_CART_KEY,
  type CartItem,
  type OrderoBranch,
} from "@/lib/ordero";
import type { SerializedProduct, SerializedSettings } from "@/lib/types";

type OrderoContextValue = {
  settings: SerializedSettings;
  locations: OrderoBranch[];
  presetLocation: OrderoBranch | null;
  cart: CartItem[];
  getQuantity: (productId: string) => number;
  increment: (product: SerializedProduct) => void;
  decrement: (productId: string) => void;
  askName: boolean;
  setAskName: (open: boolean) => void;
  confirmSelection: () => void;
};

const OrderoContext = createContext<OrderoContextValue | null>(null);

export function useOrdero() {
  const value = useContext(OrderoContext);
  if (!value) {
    throw new Error("useOrdero must be used within OrderoProvider");
  }
  return value;
}

export function useOptionalOrdero() {
  return useContext(OrderoContext);
}

export function OrderoProvider({
  settings,
  locations,
  presetLocation = null,
  children,
}: {
  settings: SerializedSettings;
  locations: OrderoBranch[];
  presetLocation?: OrderoBranch | null;
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [askName, setAskName] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(ORDERO_CART_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch {
      sessionStorage.removeItem(ORDERO_CART_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    sessionStorage.setItem(ORDERO_CART_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  const increment = useCallback((product: SerializedProduct) => {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  }, []);

  const decrement = useCallback((productId: string) => {
    setCart((current) =>
      current
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const getQuantity = useCallback(
    (productId: string) => cart.find((item) => item.product.id === productId)?.quantity ?? 0,
    [cart],
  );

  const confirmSelection = useCallback(() => {
    if (cart.length === 0) return;
    setAskName(true);
  }, [cart.length]);

  const value = useMemo(
    () => ({
      settings,
      locations,
      presetLocation,
      cart,
      getQuantity,
      increment,
      decrement,
      askName,
      setAskName,
      confirmSelection,
    }),
    [
      settings,
      locations,
      presetLocation,
      cart,
      getQuantity,
      increment,
      decrement,
      askName,
      confirmSelection,
    ],
  );

  return <OrderoContext.Provider value={value}>{children}</OrderoContext.Provider>;
}
