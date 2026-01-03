import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

export default function Agendamento() {
  const { barbeiroId } = useParams();
  const [dataHora, setDataHora] = useState("");
  const [loading, setLoading] = useState(false);

  const agendar = async () => {
    try {
      setLoading(true);
      await api.post("/agendamentos/", {
        barbeiro: barbeiroId,
        data_hora: dataHora,
      });
      alert("Agendamento realizado!");
    } catch {
      alert("Horário indisponível");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Escolha o horário</h1>

      <input
        type="datetime-local"
        className="w-full border rounded-lg p-2"
        value={dataHora}
        onChange={(e) => setDataHora(e.target.value)}
      />

      <button
        disabled={loading}
        onClick={agendar}
        className="w-full bg-green-600 text-white py-3 rounded-lg"
      >
        {loading ? "Processando..." : "Confirmar"}
      </button>
    </div>
  );
}
