// src/pages/cliente/Barbearia.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import CardBarbeiro from "../../components/Barbearia/CardBarbeiro";

export default function Barbearia() {
  const { id } = useParams(); // id da barbearia
  const [barbearia, setBarbearia] = useState(null);
  const [barbeiros, setBarbeiros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const resBarbearia = await api.get(`/barbearias/${id}`);
        setBarbearia(resBarbearia.data);

        const resBarbeiros = await api.get(`/barbearias/${id}/barbeiros`);
        setBarbeiros(resBarbeiros.data);
      } catch (error) {
        console.error("Erro ao carregar barbearia:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <p className="p-4">Carregando...</p>;
  if (!barbearia) return <p className="p-4">Barbearia não encontrada.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{barbearia.nome_fantasia}</h1>
      <p className="mb-6">{barbearia.endereco}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {barbeiros.map((b) => (
          <CardBarbeiro key={b.id} barbeiro={b} />
        ))}
      </div>
    </div>
  );
}
