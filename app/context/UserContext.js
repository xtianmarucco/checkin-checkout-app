"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";

// Crear el contexto de usuario
const UserContext = createContext();

// Hook para acceder fácilmente al contexto de usuario
export function useUser() {
  return useContext(UserContext);
}

// Proveedor del contexto para envolver la aplicación
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Función para iniciar sesión
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const { data: loggedInUser, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (error) {
        throw new Error("Credenciales incorrectas.");
      }

      setUser(loggedInUser); // Establecer el usuario en el contexto
    } catch (error) {
      throw new Error(error.message || "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logoutUser = () => {
    setUser(null); // Limpia el usuario en el contexto
  };

  // Función para sincronizar el usuario con la base de datos
  const updateUserContext = async () => {
    if (!user) return;

    const { data: updatedUser, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error al sincronizar los datos del usuario:", error.message);
    } else {
      setUser(updatedUser); // Actualiza el contexto con los datos más recientes
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        loginUser,
        logoutUser,
        updateUserContext, // Exportar la función
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
