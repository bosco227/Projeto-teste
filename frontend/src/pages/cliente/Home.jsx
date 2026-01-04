// src/pages/cliente/Home.jsx
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Corrige os ícones padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Home() {
  const navigate = useNavigate();
  const fakeBarbearias = [
    {
      id: 101,
      nome: "Barbearia do Tony",
      latitude: -3.7319,
      longitude: -38.5267,
    },
    {
      id: 102,
      nome: "Barbearia do José",
      latitude: -3.7325,
      longitude: -38.5272,
    },
  ];

  const [barbearias, setBarbearias] = useState(fakeBarbearias);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBarbearias() {
      try {
        const res = await api.get("/"); // endpoint da sua API
        const data = res.data.map((b, i) => ({
          id: b.id ?? fakeBarbearias[i]?.id ?? i,
          nome: b.nome ?? `Barbearia ${i + 1}`,
          latitude:
            b.latitude ?? fakeBarbearias[i % fakeBarbearias.length].latitude,
          longitude:
            b.longitude ?? fakeBarbearias[i % fakeBarbearias.length].longitude,
        }));
        setBarbearias(data.length ? data : fakeBarbearias);
      } catch (err) {
        console.error("Erro ao buscar barbearias", err);
        setBarbearias(fakeBarbearias);
      } finally {
        setLoading(false);
      }
    }

    fetchBarbearias();
  }, []);

  if (loading) return <p className="p-4">Carregando mapa...</p>;

  // centraliza no primeiro marcador, ou no default se vazio
  const center = barbearias.length
    ? [barbearias[0].latitude, barbearias[0].longitude]
    : [-3.7319, -38.5267];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {barbearias.map((barbearia) => (
          <Marker
            key={barbearia.id}
            position={[Number(barbearia.latitude), Number(barbearia.longitude)]}
            eventHandlers={{
              click: () => navigate(`/barbearias/${barbearia.id}`),
            }}
          >
            <Popup>
              <strong>{barbearia.nome}</strong>
              <br />
              <button
                onClick={() => navigate(`/barbearias/${barbearia.id}`)}
                className="mt-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Ver barbeiros
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
