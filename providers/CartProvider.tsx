"use client";

import { CartcontextProvider } from "@/hooks/useCart";
import React from "react";

interface CartProviderProps {
  children: React.ReactNode;
}
const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  return <CartcontextProvider>{children}</CartcontextProvider>;
};

export default CartProvider;
