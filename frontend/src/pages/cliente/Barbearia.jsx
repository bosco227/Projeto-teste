import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";
import barbeirosMock from "../../mocks/barbeirosMock";

export default function Barbearia() {
  const { id } = useParams();
  const [barbeiros, setBarbeiros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/${id}/barbeiros/`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setBarbeiros(res.data);
        } else {
          setBarbeiros(barbeirosMock);
        }
      })
      .catch(() => {
        setBarbeiros(barbeirosMock);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Carregando barbeiros...</p>;

  return (
    <div style={{ padding: "16px" }}>
      <h1>Barbeiros disponíveis</h1>

      {barbeiros.map((b) => (
        <div
          key={b.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "12px",
          }}
        >
          <h3>{b.nome}</h3>
          <p>{b.especialidade}</p>
          <p>Total de cortes: {b.total_cortes}</p>

          <Link to={`/agendar/${b.id}`}>Agendar horário →</Link>
        </div>
      ))}
    </div>
  );
}
