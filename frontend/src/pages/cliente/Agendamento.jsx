import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function Agendamento() {
  const { barbeiroId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!data) return;

    setLoading(true);

    api
      .get(`/barbeiros/${barbeiroId}/horarios/?data=${data}`)
      .then((res) => setHorarios(res.data))
      .catch((err) => {
        console.error("Erro ao buscar horários", err);
        setHorarios([]);
      })
      .finally(() => setLoading(false));
  }, [data, barbeiroId]);

  function agendar() {
    if (!data || !horarioSelecionado) {
      alert("Selecione data e horário");
      return;
    }

    api
      .post("agendamentos/", {
        barbeiro: barbeiroId,
        data_hora: `${data}T${horarioSelecionado}:00`,
      })
      .then(() => {
        alert("Agendamento criado com sucesso!");
        navigate("/");
      })
      .catch(() => alert("Erro ao criar agendamento"));
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Agendar horário</h1>

      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      {loading && <p>Carregando horários...</p>}

      <div className="flex gap-2 flex-wrap mt-4">
        {horarios.map((h) => (
          <button
            key={h}
            onClick={() => setHorarioSelecionado(h)}
            className={`px-3 py-2 rounded border ${
              horarioSelecionado === h ? "bg-black text-white" : "bg-white"
            }`}
          >
            {h}
          </button>
        ))}
      </div>

      <button
        onClick={agendar}
        className="mt-6 bg-black text-white px-4 py-2 rounded"
      >
        Confirmar
      </button>
    </div>
  );
}
