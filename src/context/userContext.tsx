"use client";

import { createContext, useContext } from "react";

type User = {
  name: string;
  email: string;
  image?: string | null | undefined;
};

const UserContext = createContext<User | null>(null);

export function useUser() {
  return useContext(UserContext);
}

type Props = {
  user: User;
  children: React.ReactNode;
};

export function UserProvider({ user, children }: Props) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
