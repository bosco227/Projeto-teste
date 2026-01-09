// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

/* Cliente */
import Home from "../pages/cliente/Home";
import Barbearia from "../pages/cliente/Barbearia";
import Agendamento from "../pages/cliente/Agendamento";

/* Admin */
import AdminLogin from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import AdminAgendamentos from "../pages/admin/Agendamentos";
import Barbeiros from "../pages/admin/Barbeiros";

/* Auth */
import RequireAdmin from "../auth/RequireAdmin";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= CLIENTE ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/barbearias/:id" element={<Barbearia />} />
      <Route path="/agendar/:barbeiroId" element={<Agendamento />} />

      {/* ================= ADMIN ================= */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={
          <RequireAdmin>
            <Dashboard />
          </RequireAdmin>
        }
      />

      <Route
        path="/admin/agendamentos"
        element={
          <RequireAdmin>
            <AdminAgendamentos />
          </RequireAdmin>
        }
      />

      <Route
        path="/admin/barbeiros"
        element={
          <RequireAdmin>
            <Barbeiros />
          </RequireAdmin>
        }
      />
    </Routes>
  );
}
