import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

import { UserProvider } from "./context/UserContext";

export const metadata = {
  title: "Registro de asistencia",
  description:
    "Registro de asistencia para personal con NextJS + Supabase + Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider> {children}</UserProvider>
      </body>
    </html>
  );
}
