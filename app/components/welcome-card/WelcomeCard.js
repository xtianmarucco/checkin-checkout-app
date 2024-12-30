"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomeCard({ user }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegistro = (action) => {
    setLoading(true);
    // Redirigir a la página de escaneo de QR y pasar la acción seleccionada como query
    router.push(`/checkin/scan?action=${action}`);
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full flex flex-col items-center text-center md:items-start md:text-left">
      <h2 className="text-xl font-bold text-primary-dark mb-2">
        Hola, {user?.username} {user?.lastname}
      </h2>
      <p className="text-gray-600 mb-4">¿Qué te gustaría hacer?</p>
      
      <div className="flex gap-4">
        <button
          onClick={() => handleRegistro("entrada")}
          className="bg-primary-dark hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? "Redirigiendo..." : "Marcar Entrada"}
        </button>

        <button
          onClick={() => handleRegistro("salida")}
          className="bg-primary-dark hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? "Redirigiendo..." : "Marcar Salida"}
        </button>
      </div>
    </div>
  );
}
