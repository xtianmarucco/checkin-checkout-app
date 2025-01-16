import { QRCodeSVG } from "qrcode.react";

export default function QRCodeTest() {
  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">Prueba de QR Code</h1>
      <QRCodeSVG
        value="https://example.com"
        size={200}
        bgColor="#ffffff"
        fgColor="#000000"
      />
      <p className="text-gray-600 text-sm mt-2">
        Este es un código QR de prueba con SVG.
      </p>
    </div>
  );
}
