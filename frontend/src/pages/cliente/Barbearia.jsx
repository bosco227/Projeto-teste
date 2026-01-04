import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function Barbearia() {
  const { id } = useParams();
  const [barbeiros, setBarbeiros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/barbearias/${id}/barbeiros/`)
      .then((res) => setBarbeiros(res.data));
  }, [id]);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {barbeiros.map((b) => (
        <div key={b.id} className="border rounded-xl p-4 flex gap-4">
          <img
            src={b.foto_url || "/avatar.png"}
            className="w-20 h-20 rounded-full object-cover"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{b.nome}</h3>
            <p className="text-sm text-gray-600">{b.especialidade}</p>
            <p className="text-xs mt-1">
              ✂️ {b.total_cortes} cortes realizados
            </p>

            <button
              className="mt-3 w-full bg-black text-white py-2 rounded-lg"
              onClick={() => navigate(`/agendar/${b.id}`)}
            >
              Agendar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
