"use client";

import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";
import { generateOtpAuthUrl } from "@/services/otpService";
import { supabase } from "@/supabaseClient";

export default function OtpSetup() {
  const { user, updateUserContext } = useUser();
  const [qrCode, setQrCode] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const setupOtp = async () => {
      if (!user) return;

      // Redirigir si ya está configurado
      if (user.user_otp_configured) {
        router.push("/checkin");
        return;
      }

      if (!user.otp_secret) {
        console.error("Error: El usuario no tiene un otp_secret asignado.");
        return;
      }

      // Generar el QR basado en el otp_secret existente
      const otpAuthUrl = generateOtpAuthUrl(user.email, "CheckinApp", user.otp_secret);
      setQrCode(otpAuthUrl);
    };

    setupOtp();
  }, [user, router]);

  const handleOtpConfigured = async () => {
    try {
      // Actualizar el campo user_otp_configured a true
      await supabase
        .from("users")
        .update({ user_otp_configured: true })
        .eq("id", user.id);

      // Actualizar el contexto del usuario
      await updateUserContext();

      // Redirigir al Check-in
      router.push("/checkin");
    } catch (error) {
      console.error("Error al configurar OTP:", error.message);
    }
  };

  return (
    <div className="p-6 bg-secondary min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-primary-dark mb-4">
        Configuración de Google Authenticator
      </h1>

      {qrCode && (
        <>
          <div className="mb-4">
            <QRCodeCanvas value={qrCode} size={200} />
            <p className="text-gray-600 text-sm mt-2">
              Escanea este código con Google Authenticator
            </p>
          </div>
          <button
            onClick={handleOtpConfigured}
            className="bg-primary-dark text-white px-4 py-2 rounded hover:bg-primary"
          >
            Confirmar Configuración
          </button>
        </>
      )}
    </div>
  );
}
