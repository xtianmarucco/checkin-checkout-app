"use client";

import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

export default function EmployeeNavbar() {
  const { user, logoutUser } = useUser();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Redirigir al check-in
  const handleLogoClick = () => {
    router.push("/checkin");
  };

  // Redirigir al perfil
  const handleProfileClick = () => {
    router.push("/employee/profile");
  };

  // Manejar el logout
  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  if (!user || user.role !== "employee") return null; // Mostrar solo para empleados

  return (
    <nav className="w-full bg-primary-dark text-white px-4 py-2 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <div
        className="text-xl font-bold cursor-pointer hover:text-primary-light"
        onClick={handleLogoClick}
      >
        EmployeePanel
      </div>

      {/* Botones del extremo derecho */}
      <div className="relative flex">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 hover:text-primary-light"
        >
          <FaUser size={15} />
          <span>{user.username}</span>
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
            <button
              onClick={handleProfileClick}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Perfil
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
