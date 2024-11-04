'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/AuthService";
import { useUser } from "@/app/context/UserContext";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { loginUser } = useUser();
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!email || !password) {
        setErrorMessage("Please enter both email and password.");
        return;
      }
  
      const { data, error } = await AuthService.login(email, password);
  
      if (error) {
        setErrorMessage(error);
      } else {
        loginUser(data); // Guardar el perfil completo en el contexto
        router.push("/checkin"); // Redirigir a la página de registro
      }
    };
  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
}
