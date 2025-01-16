"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { loginUser, loading } = useUser(); // `loading` del contexto para el estado de carga
  const router = useRouter();

  // Validaciones
  const validateEmail = () => {
    if (!email) {
      setEmailError("El campo de email es obligatorio.");
      return false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("El formato del email es incorrecto.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("El campo de contraseña es obligatorio.");
      return false;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres, letras y números.");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setErrorMessage(""); // Limpia errores previos
      await loginUser(email, password); // Autenticar usuario
  
      // Redirigir según el estado de user_otp_configured
      if (user?.user_otp_configured) {
        router.push("/checkin"); // Ir a la página de Check-in
      } else {
        router.push("/configure-otp"); // Ir a la página de configuración OTP
      }
    } catch (err) {
      setErrorMessage(err.message); // Mostrar mensaje de error
    }
  };
  

  return (
    <div className="bg-secondary p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-primary-dark mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-primary-dark text-sm font-semibold mb-2">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>
        <div>
          <label className="block text-primary-dark text-sm font-semibold mb-2">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
          />
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>
        <button
          type="submit"
          className={`w-full bg-primary-dark hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Ingresar"}
        </button>
        {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
}
