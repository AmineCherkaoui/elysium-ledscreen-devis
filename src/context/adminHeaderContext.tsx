"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface HeaderTitleContextType {
  title: string;
  setTitle: (title: string) => void;
}

const HeaderTitleContext = createContext<HeaderTitleContextType | undefined>(
  undefined
);

export const HeaderTitleProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState("");
  return (
    <HeaderTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </HeaderTitleContext.Provider>
  );
};

export const useHeaderTitle = () => useContext(HeaderTitleContext);
