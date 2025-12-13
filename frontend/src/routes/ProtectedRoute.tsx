import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { RUTAS } from "./index";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Array<"alumno" | "mentor" | "admin">;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { usuario } = useAuth();

  // Usuario NO logueado
  if (!usuario) {
    return <Navigate to={RUTAS.LOGIN} replace />;
  }

  // Rol NO permitido
  if (allowedRoles && !allowedRoles.includes(usuario.tipo)) {
    return <Navigate to={RUTAS.LOGIN} replace />;
  }

  // Acceso permitido
  return <>{children}</>;
}
