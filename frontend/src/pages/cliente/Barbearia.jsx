// src/pages/cliente/Barbearia.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/apiPublic";
import CardBarbeiro from "../../components/Barbearia/CardBarbeiro";

export default function Barbearia() {
  const { id } = useParams(); // id da barbearia
  const [barbeiros, setBarbeiros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/barbearias/${id}/barbeiros/`)
      .then((res) => setBarbeiros(res.data))
      .catch((err) => console.error("Erro ao carregar barbeiros", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-4">Carregando...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Barbeiros</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {barbeiros.map((b) => (
          <CardBarbeiro key={b.id} barbeiro={b} />
        ))}
      </div>
    </div>
  );
}
