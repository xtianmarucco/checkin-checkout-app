import { FaCheckCircle, FaTimes } from "react-icons/fa";

export default function SuccessModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        {/* Botón para cerrar el modal */}
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <FaTimes size={24} /> {/* Icono de cerrar */}
        </button>

        {/* Icono de éxito */}
        <div className="flex flex-col items-center justify-center">
          <FaCheckCircle className="text-green-500" size={60} /> {/* Icono de éxito */}
          <h2 className="text-xl font-bold text-center mt-4">
            Usuario agregado con éxito
          </h2>
          <p className="text-gray-700 text-center mt-2">
            El usuario <strong>{user.username} {user.lastname}</strong> ha sido agregado con éxito.
          </p>
        </div>

        {/* Botón de cerrar */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-primary-dark text-white px-6 py-2 rounded hover:bg-primary"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
