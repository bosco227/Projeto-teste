import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ajuste do ícone default do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function Mapa() {
  const [barbearias, setBarbearias] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBarbearias() {
      try {
        const res = await api.get("/barbearias");
        setBarbearias(res.data);
      } catch (error) {
        console.error("Erro ao carregar barbearias:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBarbearias();
  }, []);

  if (loading) return <p className="p-4">Carregando mapa...</p>;

  return (
    <div className="w-full h-screen">
      <MapContainer
        center={[-3.73, -38.54]} // exemplo: Fortaleza
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {barbearias.map((b) => (
          <Marker
            key={b.id}
            position={[b.latitude, b.longitude]}
            eventHandlers={{
              click: () => navigate(`/barbearia/${b.id}`),
            }}
          >
            <Popup>
              <div className="flex flex-col">
                <strong>{b.nome_fantasia}</strong>
                <span>{b.endereco}</span>
                <button
                  onClick={() => navigate(`/barbearia/${b.id}`)}
                  className="mt-2 px-2 py-1 bg-black text-white rounded"
                >
                  Ver barbeiros
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
