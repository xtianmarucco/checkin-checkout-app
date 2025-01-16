"use client";

import { useEffect } from "react";
import CreateUserForm from "../components/create-user-form/CreateUserForm";
import ProtectedRoute from "../components/routes-handler/ProtectedRoute";
import AdminNavbar from "../components/admin-navbar/AdminNavbar";
export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary">
     <AdminNavbar/>
      <h1 className="text-3xl font-bold text-primary-dark mb-4">
        Bienvenido, Administrador
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Usa el menú de abajo para gestionar tu aplicación.
      </p>
      <div className="flex flex-col gap-4">
        <CreateUserForm />
      </div>
    </div>
    </ProtectedRoute>
  );
}
