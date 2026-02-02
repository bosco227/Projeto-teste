import { Routes, Route } from "react-router-dom";

/* Cliente */
import Home from "../pages/cliente/Home";
import Barbearia from "../pages/cliente/Barbearia";
import Agendamento from "../pages/cliente/Agendamento";

/* Admin */
import Dashboard from "../pages/admin/Dashboard";
import AdminAgendamentos from "../pages/admin/Agendamentos";
import Barbeiros from "../pages/admin/Barbeiros";

/* Auth */
import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../pages/Login";

export default function AppRoutes() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<Login />} />

      {/* ================= CLIENTE ================= */}
      <Route
        path="/mapa"
        element={
          <ProtectedRoute perfilNecessario="cliente">
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/barbearias/:id"
        element={
          <ProtectedRoute perfilNecessario="cliente">
            <Barbearia />
          </ProtectedRoute>
        }
      />

      <Route
        path="/agendar/:barbeiroId"
        element={
          <ProtectedRoute perfilNecessario="cliente">
            <Agendamento />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute perfilNecessario="barbearia">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/agendamentos"
        element={
          <ProtectedRoute perfilNecessario="barbearia">
            <AdminAgendamentos />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/barbeiros"
        element={
          <ProtectedRoute perfilNecessario="barbearia">
            <Barbeiros />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
