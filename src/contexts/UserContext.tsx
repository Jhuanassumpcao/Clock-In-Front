import React, { createContext, useState, useContext } from "react";

interface UserContextType {
  user: {
      id: number | null; name: string | null; token: string | null 
};
  setUser: (name: string | null, token: string | null, id: number | null) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<{ name: string | null; token: string | null, id: number | null }>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { name: null, token: null };
  });

  const setUser = (name: string | null, token: string | null, id: number | null) => {
    const userData = { name, token, id };
    setUserState(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const clearUser = () => {
    setUserState({ name: null, token: null, id: null });
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};
