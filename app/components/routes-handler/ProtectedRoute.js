"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirigir al login si no está autenticado
      return;
    }

    // Si el rol es "employee", verificar `user_otp_configured`
    if (user.role === "employee") {
      if (!user.user_otp_configured) {
        router.push("/configure-otp"); // Redirigir a la configuración de OTP
        return;
      } else {
        router.push("/checkin"); // Redirigir al checkin si OTP está configurado
        return;
      }
    }

    // Si el rol requerido no coincide, redirigir al inicio
    if (requiredRole && user.role !== requiredRole) {
      router.push("/login"); // Redirigir a una página de acceso denegado o inicio
      return;
    }
  }, [user, requiredRole, router]);

  if (!user) return <p>Cargando...</p>;

  return children;
}
