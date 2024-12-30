import { supabase } from "../supabaseClient";
import { authenticator } from "otplib";

/**
 * Genera y asigna claves secretas a los usuarios existentes en la base de datos.
 */
export const assignSecretsToExistingUsers = async () => {
  try {
    // Obtener todos los usuarios que no tienen una clave secreta
    const { data: users, error } = await supabase
      .from("users")
      .select("id, otp_secret")
      .is("otp_secret", null); // Filtrar usuarios sin clave secreta

    if (error) {
      console.error("Error al obtener usuarios:", error.message);
      return;
    }

    // Generar y asignar claves secretas
    for (const user of users) {
      const secret = authenticator.generateSecret();

      // Actualizar la clave secreta en la base de datos
      const { error: updateError } = await supabase
        .from("users")
        .update({ otp_secret: secret })
        .eq("id", user.id);

      if (updateError) {
        console.error(`Error al actualizar el usuario ${user.id}:`, updateError.message);
      } else {
        console.log(`Clave secreta asignada al usuario ${user.id}`);
      }
    }

    console.log("Claves secretas asignadas a todos los usuarios.");
  } catch (err) {
    console.error("Error inesperado:", err.message);
  }
};
