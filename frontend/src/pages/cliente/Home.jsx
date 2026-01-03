import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "leaflet/dist/leaflet.css";

export default function Home() {
  const [barbearias, setBarbearias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/barbearias/").then((res) => setBarbearias(res.data));
  }, []);

  return (
    <div className="h-screen">
      <MapContainer center={[-3.7, -38.5]} zoom={13} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {barbearias.map((b) => (
          <Marker key={b.id} position={[b.latitude, b.longitude]}>
            <Popup>
              <strong>{b.nome_fantasia}</strong>
              <br />
              <button
                className="mt-2 text-blue-600"
                onClick={() => navigate(`/barbearias/${b.id}`)}
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
