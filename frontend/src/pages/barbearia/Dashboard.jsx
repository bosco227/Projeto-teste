import { useEffect, useState } from "react";
import { api } from "../../api/api";
import CardAgendamento from "../../components/Barbearia/CardAgendamento";
import CardCliente from "../../components/Barbearia/CardCliente";

export default function Dashboard() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loadingAgenda, setLoadingAgenda] = useState(true);
  const [loadingClientes, setLoadingClientes] = useState(true);

  useEffect(() => {
    async function fetchAgenda() {
      try {
        const res = await api.get("/dashboard/agenda");
        setAgendamentos(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingAgenda(false);
      }
    }
    fetchAgenda();
  }, []);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const res = await api.get("/dashboard/clientes");
        setClientes(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingClientes(false);
      }
    }
    fetchClientes();
  }, []);

  const atualizarStatus = async (id, status) => {
    try {
      await api.patch(`/agendamentos/${id}`, { status });
      setAgendamentos((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const enviarMarketing = async () => {
    try {
      await api.post("/dashboard/marketing", {
        mensagem: "Promoção especial!",
      });
      alert("Marketing enviado para todos os clientes!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard da Barbearia</h1>

      {/* === Agenda === */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Agenda</h2>
        {loadingAgenda ? (
          <p>Carregando agendamentos...</p>
        ) : agendamentos.length === 0 ? (
          <p>Nenhum agendamento</p>
        ) : (
          <div className="flex flex-col gap-2">
            {agendamentos.map((a) => (
              <CardAgendamento
                key={a.id}
                agendamento={a}
                onConfirmar={(id) => atualizarStatus(id, "confirmado")}
                onConcluir={(id) => atualizarStatus(id, "concluido")}
              />
            ))}
          </div>
        )}
      </section>

      {/* === Clientes (CRM) === */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Clientes</h2>
        {loadingClientes ? (
          <p>Carregando clientes...</p>
        ) : clientes.length === 0 ? (
          <p>Nenhum cliente registrado</p>
        ) : (
          <div className="flex flex-col gap-2">
            {clientes.map((c) => (
              <CardCliente key={c.id} cliente={c} />
            ))}
          </div>
        )}
      </section>

      {/* === Marketing === */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Marketing</h2>
        <button
          onClick={enviarMarketing}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Enviar promoção
        </button>
      </section>
    </div>
  );
}
