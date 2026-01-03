import { Routes, Route } from "react-router-dom";
import Mapa from "../pages/cliente/Mapa";
import Barbearia from "../pages/cliente/Barbearia";
import Agendamento from "../pages/cliente/Agendamento";
import MeusAgendamentos from "../pages/cliente/MeusAgendamentos";

import Dashboard from "../pages/barbearia/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Mapa />} />
      <Route path="/barbearia/:id" element={<Barbearia />} />
      <Route path="/agendar/:barbeiroId" element={<Agendamento />} />
      <Route path="/meus-agendamentos" element={<MeusAgendamentos />} />

      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
