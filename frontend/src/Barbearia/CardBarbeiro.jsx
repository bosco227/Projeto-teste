// src/components/Barbearia/CardBarbeiro.jsx
import { useNavigate } from "react-router-dom";

export default function CardBarbeiro({ barbeiro }) {
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg p-4 shadow">
      {barbeiro.foto_url && (
        <img
          src={barbeiro.foto_url}
          alt={barbeiro.nome}
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}

      <h2 className="text-lg font-semibold">{barbeiro.nome}</h2>

      {barbeiro.especialidade && (
        <p className="text-sm text-gray-600">{barbeiro.especialidade}</p>
      )}

      <p className="text-sm mt-2">
        Cortes realizados: <strong>{barbeiro.total_cortes}</strong>
      </p>

      <button
        onClick={() => navigate(`/agendar/${barbeiro.id}`)}
        className="mt-4 w-full bg-black text-white py-2 rounded"
      >
        Agendar horário
      </button>
    </div>
  );
}
