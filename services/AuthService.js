// services/AuthService.js
// services/AuthService.js
import { supabase } from "../supabaseClient";

export const AuthService = {
  async login(email, password) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok || !result.data || !result.data.id) {
      console.error("Error during login:", result.error || "User data is missing.");
      return { error: result.error || "Login failed." };
    }

    // Hacer la consulta a `users` para obtener los datos completos del usuario
    const { data: userProfile, error } = await supabase
      .from("users")
      .select("id, email, role, username, lastname")
      .eq("id", result.data.id)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return { error: "Failed to load user profile." };
    }

    return { data: userProfile };
  },
};
