import { useEffect, useState } from "react";
import api from "../../api/api";

export default function AdminAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  function carregar() {
    setLoading(true);
    api
      .get("/dashboard/agendamentos/")
      .then((res) => setAgendamentos(res.data))
      .finally(() => setLoading(false));
  }

  function atualizarStatus(id, status) {
    api
      .patch(`/dashboard/agendamentos/${id}/status/`, { status })
      .then(carregar)
      .catch(() => alert("Erro ao atualizar status"));
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div style={{ padding: "16px" }}>
      <h1>Agendamentos</h1>

      {loading && <p>Carregando...</p>}

      {!loading && agendamentos.length === 0 && (
        <p>Nenhum agendamento ainda.</p>
      )}

      {!loading &&
        agendamentos.map((a) => (
          <div
            key={a.id}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              marginBottom: "8px",
              borderRadius: "6px",
            }}
          >
            <p>
              <strong>Cliente:</strong> {a.cliente_username}
            </p>
            <p>
              <strong>Barbeiro:</strong> {a.barbeiro_nome}
            </p>
            <p>
              <strong>Data:</strong> {new Date(a.data_hora).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {a.status}
            </p>

            <div style={{ display: "flex", gap: "8px" }}>
              {a.status !== "confirmado" && (
                <button onClick={() => atualizarStatus(a.id, "confirmado")}>
                  Confirmar
                </button>
              )}

              {a.status !== "concluido" && (
                <button onClick={() => atualizarStatus(a.id, "concluido")}>
                  Concluir
                </button>
              )}

              {a.status !== "cancelado" && (
                <button onClick={() => atualizarStatus(a.id, "cancelado")}>
                  Cancelar
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
