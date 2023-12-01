"use client";

import { CartcontextProvider } from "@/hooks/useCart";
import React from "react";

interface AppProviderProps {
  children: React.ReactNode;
}
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return <CartcontextProvider>{children}</CartcontextProvider>;
};

export default AppProvider;
