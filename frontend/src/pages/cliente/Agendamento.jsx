import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/apiPrivate";

export default function Agendamento() {
  const { barbeiroId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 Proteção: apenas cliente pode acessar
  useEffect(() => {
    async function verificarPerfil() {
      const token = localStorage.getItem("token");
      const perfil = localStorage.getItem("perfil");

      if (!token) {
        alert("Você precisa estar logado");
        navigate("/login");
        return;
      }

      // fallback seguro: perfil vem do backend se não existir
      if (!perfil) {
        try {
          const res = await api.get("/meu-perfil/");
          localStorage.setItem("perfil", res.data.perfil);

          if (res.data.perfil !== "cliente") {
            alert("Apenas clientes podem agendar");
            navigate("/login");
          }
        } catch {
          navigate("/login");
        }
      } else if (perfil !== "cliente") {
        alert("Apenas clientes podem agendar");
        navigate("/login");
      }
    }

    verificarPerfil();
  }, [navigate]);

  // 📅 Buscar horários
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

  // ✂️ Criar agendamento
  async function agendar() {
    if (!data || !horarioSelecionado) {
      alert("Selecione data e horário");
      return;
    }

    try {
      await api.post("/agendamentos/", {
        barbeiro: barbeiroId,
        data_hora: `${data}T${horarioSelecionado}:00`,
      });

      alert("Agendamento criado com sucesso!");
      navigate("/cliente");
    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        alert("Sessão expirada. Faça login novamente.");
        localStorage.clear();
        navigate("/login");
      } else if (err.response?.status === 400) {
        alert("Horário indisponível");
      } else if (err.response?.status === 403) {
        alert("Perfil não autorizado");
      } else {
        alert("Erro ao criar agendamento");
      }
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Agendar horário</h1>

      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="border p-2 rounded"
      />

      {loading && <p>Carregando horários...</p>}

      <div className="flex gap-2 flex-wrap mt-4">
        {horarios.map((h) => (
          <button
            key={h}
            onClick={() => setHorarioSelecionado(h)}
            className={`px-3 py-2 rounded border transition ${
              horarioSelecionado === h
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
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
