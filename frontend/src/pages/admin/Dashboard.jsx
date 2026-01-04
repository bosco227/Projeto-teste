import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/admin/dashboard/").then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p className="p-4">Carregando...</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="border p-4 rounded">
        <p>Pendentes: {stats.pendentes}</p>
        <p>Confirmados hoje: {stats.confirmados_hoje}</p>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => navigate("/admin/agendamentos")}
      >
        Ver Agenda
      </button>
    </div>
  );
}
