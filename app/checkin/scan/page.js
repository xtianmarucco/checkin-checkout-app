"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../supabaseClient";
import { useUser } from "../../context/UserContext";

export default function ScanPage() {
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const [scanning, setScanning] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");

  const handleScan = async (decodedText) => {
    if (!scanning || !user) return;
    
    setScanning(false); // Detener escaneo tras detectar un código QR

    const { error } = await supabase
      .from("asistencias")
      .insert([{ usuario_id: user.id, accion: action, fecha_hora: new Date() }]);

    if (error) {
      setMessage("Error al registrar la acción. Intenta de nuevo.");
      setScanning(true);
    } else {
      setMessage(`Registro de ${action} exitoso.`);
      alert(`Registro de ${action} exitoso.`)
      setTimeout(() => router.push("/dashboard"), 2000); // Redirigir tras un tiempo
    }
  };

  const handleError = (errorMessage) => {
    console.error("Error de escaneo:", errorMessage);
    setMessage("Error al abrir la cámara. Por favor, verifica los permisos.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-secondary text-center">
      <h1 className="text-2xl font-bold text-primary-dark mb-6">Escanear Código QR</h1>
      {/* {scanning ? (
        <QrScanner onScan={handleScan} onError={handleError} />
      ) : (
        <p className="text-primary-dark">Procesando...</p>
      )} */}
      {message && <p className="mt-4 text-primary-dark">{message}</p>}
    </div>
  );
}
