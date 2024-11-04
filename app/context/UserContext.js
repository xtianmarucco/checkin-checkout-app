"use client";

import { createContext, useContext, useState } from "react";

// Crear el contexto de usuario
const UserContext = createContext();

// Hook para acceder fácilmente al contexto de usuario
export function useUser() {
  return useContext(UserContext);
}

// Proveedor del contexto para envolver la aplicación
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
    setUser(userData); // Establece el usuario en el contexto
  };

  const logoutUser = () => {
    setUser(null); // Limpia el usuario en el contexto
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}