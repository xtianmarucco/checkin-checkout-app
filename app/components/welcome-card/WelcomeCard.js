"use client";

import { useState } from 'react';

export default function WelcomeCard({ user, onRegistro }) {
  const [loading, setLoading] = useState(false);
console.log(user);
  const handleRegistro = async (accion) => {
    setLoading(true);
    await onRegistro(accion);
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full flex flex-col items-center text-center md:items-start md:text-left">
      {/* <img
        src={user?.image || '/default-avatar.png'}
        alt="User profile"
        className="w-24 h-24 rounded-full mb-4"
      /> */}
      <h2 className="text-xl font-bold text-primary-dark mb-2">
        Hola, {user?.username} {user?.lastname}
      </h2>
      <p className="text-gray-600 mb-4">¿Qué te gustaría hacer?</p>
      
      <div className="flex gap-4">
        <button
          onClick={() => handleRegistro('entrada')}
          className="bg-primary-dark hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Marcar Entrada'}
        </button>

        <button
          onClick={() => handleRegistro('salida')}
          className="bg-primary-dark hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Marcar Salida'}
        </button>
      </div>
    </div>
  );
}
