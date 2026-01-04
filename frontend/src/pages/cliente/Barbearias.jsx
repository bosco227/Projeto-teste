import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import barbeariasMock from "../../mocks/barbeariasMock";

export default function Barbearias() {
  const [barbearias, setBarbearias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setBarbearias(res.data);
        } else {
          // fallback DEV
          setBarbearias(barbeariasMock);
        }
      })
      .catch(() => {
        // fallback DEV se backend cair
        setBarbearias(barbeariasMock);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando barbearias...</p>;

  return (
    <div style={{ padding: "16px" }}>
      <h1>Barbearias próximas</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {barbearias.map((b) => (
          <li
            key={b.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "12px",
            }}
          >
            <h3>{b.nome}</h3>
            <p>{b.endereco}</p>

            <Link to={`/barbearias/${b.id}`}>
              Ver barbeiros →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
