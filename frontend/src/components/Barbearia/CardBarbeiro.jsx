// src/components/Barbearia/CardBarbeiro.jsx
import { Link } from "react-router-dom";

export default function CardBarbeiro({ barbeiro }) {
  return (
    <div className="border p-4 rounded-xl shadow flex flex-col items-center gap-2">
      <img
        src={barbeiro.foto_url || "/placeholder.png"}
        alt={barbeiro.nome}
        className="w-24 h-24 rounded-full object-cover"
      />
      <h2 className="font-bold text-lg">{barbeiro.nome}</h2>
      <p className="text-gray-600">{barbeiro.especialidade}</p>
      <p className="text-sm text-gray-500">
        Cortes realizados: {barbeiro.total_cortes || 0}
      </p>
      <Link
        to={`/agendar/${barbeiro.id}`}
        className="mt-2 w-full text-center bg-black text-white py-2 rounded"
      >
        Agendar
      </Link>
    </div>
  );
}
