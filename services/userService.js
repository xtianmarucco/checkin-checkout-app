import { supabase } from "../supabaseClient";
import { authenticator } from "otplib";

/**
 * Crear un nuevo usuario en la base de datos.
 */
export const createUser = async (userData) => {
  try {
    const otp_secret = authenticator.generateSecret(); // Generar clave OTP

    // Inserción en la base de datos
    const { data, error } = await supabase.from("users").insert(
      [
        {
          ...userData,
          otp_secret,
        },
      ],
      { returning: "representation" } // Solicitar datos insertados
    );

    console.log("Respuesta de Supabase:", { data, error });

    // Manejar el caso en que `data` sea null o vacío
    if (!data || data.length === 0) {
      console.warn("La respuesta de Supabase no contiene datos.");
      return {
        ...userData,
        otp_secret,
        user_otp_configured: false,
      }; // Retornar los datos generados localmente
    }

    return data[0]; // Devolver el primer registro insertado
  } catch (error) {
    console.error("Error en createUser:", error.message);
    throw new Error("Error al crear el usuario: " + error.message);
  }
};

/**
 * Editar un usuario existente en la base de datos.
 */
export const updateUser = async (id, updates) => {
  try {
    const { data, error } = await supabase.from("users").update(updates).eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  } catch (error) {
    throw new Error("Error al actualizar el usuario: " + error.message);
  }
};

/**
 * Eliminar un usuario por ID.
 */
export const deleteUser = async (id) => {
  try {
    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  } catch (error) {
    throw new Error("Error al eliminar el usuario: " + error.message);
  }
};
