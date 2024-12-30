import { assignSecretsToExistingUsers } from "../services/authenticatorService.js";

(async () => {
  console.log("Asignando claves secretas...");
  await assignSecretsToExistingUsers();
  console.log("Proceso finalizado.");
})();