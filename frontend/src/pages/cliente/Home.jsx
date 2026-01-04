import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import api from "../../api/api";

export default function Home() {
  const [barbearias, setBarbearias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        setBarbearias(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar barbearias", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando mapa...</p>;
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[-3.7319, -38.5267]} // centro padrão (Fortaleza, pode trocar)
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {barbearias.map((barbearia) => {
          // 🔥 FILTRO OBRIGATÓRIO
          if (
            barbearia.latitude === null ||
            barbearia.longitude === null ||
            barbearia.latitude === undefined ||
            barbearia.longitude === undefined
          ) {
            return null;
          }

          return (
            <Marker
              key={barbearia.id}
              position={[
                Number(barbearia.latitude),
                Number(barbearia.longitude),
              ]}
            >
              <Popup>
                <strong>{barbearia.nome}</strong>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
