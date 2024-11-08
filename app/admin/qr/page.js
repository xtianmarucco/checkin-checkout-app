"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRPage() {
  const [token, setToken] = useState("");
  const [expirationTime, setExpirationTime] = useState(null);

  useEffect(() => {
    // Función para generar un nuevo token diario
    const generateDailyToken = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Establecer a medianoche
      const expiration = new Date(today.getTime() + 24 * 60 * 60 * 1000); // +24 horas

      // Generar un token simplificado basado en la fecha actual
      const newToken = `checkin_${today.toISOString().split("T")[0]}`; // E.g., "checkin_2024-10-31"
      setToken(newToken);
      setExpirationTime(expiration);

      // Guardar el token y la fecha de expiración en localStorage
      localStorage.setItem("dailyQrToken", newToken);
      localStorage.setItem("expirationTime", expiration.toString());
    };

    // Cargar el token actual si aún es válido
    const savedToken = localStorage.getItem("dailyQrToken");
    const savedExpiration = new Date(localStorage.getItem("expirationTime"));

    if (savedToken && savedExpiration > new Date()) {
      setToken(savedToken);
      setExpirationTime(savedExpiration);
    } else {
      generateDailyToken();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-secondary text-center">
      <h1 className="text-2xl font-bold text-primary-dark mb-4">Código QR de Check-In/Out</h1>
      {token ? (
        <>
          <QRCodeCanvas value={token} size={300} bgColor="#F3F3E0" fgColor="#133E87" level="H" />
          <p className="mt-4 text-gray-600">Este código expira el: {expirationTime?.toLocaleString()}</p>
        </>
      ) : (
        <p className="text-primary-dark">Generando QR...</p>
      )}
    </div>
  );
}