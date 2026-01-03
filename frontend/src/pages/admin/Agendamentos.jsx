import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  const carregar = () => {
    api.get("/admin/agendamentos/").then((res) => setAgendamentos(res.data));
  };

  useEffect(() => {
    carregar();
  }, []);

  const atualizar = async (id, status) => {
    await api.patch(`/agendamentos/${id}/`, { status });
    carregar();
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Agenda</h1>

      {agendamentos.map((a) => (
        <div key={a.id} className="border rounded p-4">
          <p className="font-semibold">{a.cliente_nome}</p>
          <p className="text-sm">
            {a.barbeiro_nome} • {new Date(a.data_hora).toLocaleString()}
          </p>

          {a.status === "pendente" && (
            <div className="flex gap-2 mt-3">
              <button
                className="flex-1 bg-green-600 text-white py-2 rounded"
                onClick={() => atualizar(a.id, "confirmado")}
              >
                Confirmar
              </button>
              <button
                className="flex-1 bg-red-500 text-white py-2 rounded"
                onClick={() => atualizar(a.id, "cancelado")}
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
