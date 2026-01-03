import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";

export default function Agendamento() {
  const { barbeiroId } = useParams();
  const navigate = useNavigate();

  const [barbeiro, setBarbeiro] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const resBarbeiro = await api.get(`/barbeiros/${barbeiroId}`);
        setBarbeiro(resBarbeiro.data);
      } catch (error) {
        console.error("Erro ao buscar barbeiro:", error);
      }
    }
    fetchData();
  }, [barbeiroId]);

  useEffect(() => {
    if (!data) return;

    async function fetchHorarios() {
      try {
        const res = await api.get(
          `/barbeiros/${barbeiroId}/horarios-disponiveis?data=${data}`
        );
        setHorarios(res.data);
      } catch (error) {
        console.error("Erro ao buscar horários:", error);
      }
    }

    fetchHorarios();
  }, [barbeiroId, data]);

  const handleAgendar = async (hora) => {
    try {
      await api.post("/agendamentos", {
        barbeiro_id: barbeiroId,
        data_hora: `${data}T${hora}`,
      });
      alert("Agendamento criado!");
      navigate("/meus-agendamentos");
    } catch (error) {
      console.error("Erro ao agendar:", error);
      alert("Erro ao criar agendamento");
    }
  };

  if (!barbeiro) return <p className="p-4">Carregando barbeiro...</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">{barbeiro.nome}</h1>
      <p className="mb-4">{barbeiro.especialidade}</p>

      <label className="block mb-2">Escolha a data:</label>
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      <h2 className="font-semibold mb-2">Horários disponíveis:</h2>
      {horarios.length === 0 && <p>Nenhum horário disponível</p>}
      <div className="grid grid-cols-2 gap-2">
        {horarios.map((hora) => (
          <button
            key={hora}
            onClick={() => handleAgendar(hora)}
            className="bg-black text-white py-2 rounded"
          >
            {hora}
          </button>
        ))}
      </div>
    </div>
  );
}
