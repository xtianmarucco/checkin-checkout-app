"use client";

import { useUser } from "../context/UserContext";
import WelcomeCard from "@/app/components/welcome-card/WelcomeCard";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import ProtectedRoute from "../components/routes-handler/ProtectedRoute";
import EmployeeNavbar from "../components/employee-navbar/EmployeeNavbar";


export default function RegistroPage() {
  const { user } = useUser();
  const [message, setMessage] = useState("");

  const handleRegistro = async (accion) => {
    const { error } = await supabase
      .from("asistencias")
      .insert([{ usuario_id: user.id, accion, fecha_hora: new Date() }]);

    if (error) {
      setMessage("Error al registrar la acción, intenta de nuevo.");
    } else {
      setMessage(`Registro de ${accion} exitoso.`);
    }
  };

  return (
    <ProtectedRoute requiredRole="employee" >
      <EmployeeNavbar/>     

    <div className="min-h-screen flex items-center justify-center md:justify-start p-4 md:pl-16 bg-secondary">
      {user ? (
        <WelcomeCard user={user} onRegistro={handleRegistro} />
      ) : (
        <p className="text-primary-dark">Cargando...</p>
      )}
      {message && <p className="text-primary-dark mt-4">{message}</p>}
    </div>
    </ProtectedRoute>
  );
}