"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QrScanner({ onScan, onError }) {
  const qrRef = useRef(null);
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    if (!qrRef.current) return;

    const html5QrCode = new Html5Qrcode(qrRef.current.id);
    setScanner(html5QrCode);

    // Iniciar el escáner con la cámara trasera
    html5QrCode
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => onScan(decodedText),
        (errorMessage) => onError(errorMessage)
      )
      .catch((err) => {
        console.error("Error al iniciar el escáner:", err);
        onError("No se pudo acceder a la cámara. Verifica los permisos.");
      });

    // Detener el escáner cuando el componente se desmonte si está activo
    return () => {
      if (html5QrCode.isScanning) {
        html5QrCode
          .stop()
          .then(() => html5QrCode.clear())
          .catch((err) => console.error("Error al detener el escáner:", err));
      }
    };
  }, [onScan, onError]);

  return <div id="qr-reader" ref={qrRef} style={{ width: "100%" }} />;
}
