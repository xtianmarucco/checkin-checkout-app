
import  LoginForm  from "@/app/components/login-form/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      {/* Contenedor para el formulario de login */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>

      {/* Contenedor para el degradado de fondo */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-primary-dark via-primary to-primary-light">
        {/* Espacio vacío, la imagen o el contenido de fondo irán aquí en el futuro */}
      </div>
    </div>
  );
};

