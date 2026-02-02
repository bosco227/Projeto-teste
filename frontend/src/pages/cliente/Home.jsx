import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import api from "../../api/apiPublic";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// FIX DEFINITIVO DO ÍCONE DO LEAFLET (SEM CDN)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Home() {
  const [barbearias, setBarbearias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBarbearias() {
      try {
        const response = await api.get("/barbearias/");
        setBarbearias(response.data);
      } catch (err) {
        console.error("Erro ao buscar barbearias", err);
      }
    }

    fetchBarbearias();
  }, []);

  return (
    <MapContainer
      center={[-3.7319, -38.5267]}
      zoom={14}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {barbearias.map((b) => (
        <Marker
          key={b.id}
          position={[Number(b.latitude), Number(b.longitude)]}
          eventHandlers={{
            click: () => navigate(`/barbearias/${b.id}`),
          }}
        >
          <Popup>
            <strong>{b.nome_fantasia}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
