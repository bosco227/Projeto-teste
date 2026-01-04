import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import horariosMock from "../../mocks/horariosMock";

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
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setHorarios(res.data);
        } else {
          setHorarios(horariosMock);
        }
      })
      .catch(() => {
        setHorarios(horariosMock);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [data, barbeiroId]);

  function agendar() {
    if (!data || !horarioSelecionado) {
      alert("Selecione data e horário");
      return;
    }

    const dataHora = `${data}T${horarioSelecionado}:00`;

    api
      .post("/agendamentos/", {
        barbeiro: barbeiroId,
        data_hora: dataHora,
      })
      .then(() => {
        alert("Agendamento criado!");
        navigate("/");
      })
      .catch(() => {
        alert("Erro ao agendar");
      });
  }

  return (
    <div style={{ padding: "16px" }}>
      <h1>Agendar horário</h1>

      <label>Escolha a data:</label>
      <br />
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      {loading && <p>Carregando horários...</p>}

      {horarios.length > 0 && (
        <>
          <h3>Horários disponíveis</h3>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {horarios.map((h) => (
              <button
                key={h}
                onClick={() => setHorarioSelecionado(h)}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border:
                    horarioSelecionado === h
                      ? "2px solid black"
                      : "1px solid #ccc",
                  background: horarioSelecionado === h ? "#ddd" : "#fff",
                }}
              >
                {h}
              </button>
            ))}
          </div>
        </>
      )}

      <br />
      <button onClick={agendar} style={{ marginTop: "16px" }}>
        Confirmar agendamento
      </button>
    </div>
  );
}
