"use client";

import { useState, useEffect } from "react";
import SuccessModal from "../success-modal/SuccessModal";
import { createUser } from "@/services/userService";

export default function CreateUserForm() {
  const [formData, setFormData] = useState({
    username: "",
    lastname: "",
    email: "",
    id_number: "",
    role: "employee",
    hourly_wage: "",
    active: true,
  });
  console.log(formData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successUser, setSuccessUser] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newUser = await createUser(formData);
      setSuccessUser(newUser);
      setFormData({
        username: "",
        lastname: "",
        email: "",
        id_number: "",
        role: "employee",
        hourly_wage: "",
        active: true,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSuccessUser(null);
  };

  return (
    <>
      {successUser && (
        <SuccessModal user={successUser} onClose={handleCloseModal} />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Apellido</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Número de Identificación</label>
          <input
            type="text"
            name="id_number"
            value={formData.id_number}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Rol</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="employee">Empleado</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Tarifa por Hora</label>
          <input
            type="number"
            name="hourly_wage"
            value={formData.hourly_wage}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Activo</label>
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-primary-dark text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Usuario"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </>
  );
}
