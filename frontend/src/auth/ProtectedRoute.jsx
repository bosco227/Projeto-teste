import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, perfilNecessario }) {
  const token = localStorage.getItem("token");
  const perfil = localStorage.getItem("perfil");

  // 🔒 Não logado
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 🔒 Logado, mas perfil errado
  if (perfilNecessario && perfil !== perfilNecessario) {
    return <Navigate to="/" replace />;
  }

  return children;
}
