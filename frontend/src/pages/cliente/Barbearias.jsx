import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function Barbearias() {
  const [barbearias, setBarbearias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/barbearias/").then((res) => setBarbearias(res.data));
  }, []);

  return (
    <div className="p-4 space-y-4">
      {barbearias.map((b) => (
        <div
          key={b.id}
          className="border p-4 rounded-lg"
          onClick={() => navigate(`/barbearias/${b.id}`)}
        >
          <h3 className="font-bold">{b.nome_fantasia}</h3>
          <p className="text-sm text-gray-600">{b.endereco}</p>
        </div>
      ))}
    </div>
  );
}
