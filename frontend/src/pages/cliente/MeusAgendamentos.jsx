import { useEffect, useState } from "react";
import { api } from "../../api/api";

export default function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAgendamentos() {
      try {
        const res = await api.get("/meus-agendamentos");
        setAgendamentos(res.data);
      } catch (error) {
        console.error("Erro ao carregar agendamentos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAgendamentos();
  }, []);

  if (loading) return <p className="p-4">Carregando agendamentos...</p>;
  if (agendamentos.length === 0)
    return <p className="p-4">Nenhum agendamento encontrado.</p>;

  const statusColors = {
    pendente: "bg-yellow-200 text-yellow-800",
    confirmado: "bg-green-200 text-green-800",
    concluido: "bg-blue-200 text-blue-800",
    cancelado: "bg-red-200 text-red-800",
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Meus Agendamentos</h1>
      <div className="flex flex-col gap-4">
        {agendamentos.map((a) => (
          <div
            key={a.id}
            className="border p-4 rounded-xl flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{a.barbeiro_nome}</p>
              <p className="text-gray-600">
                {new Date(a.data_hora).toLocaleString("pt-BR")}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full font-semibold ${
                statusColors[a.status]
              }`}
            >
              {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
