import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiPrivate";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      // 1️⃣ Login (JWT)
      const res = await api.post("/login/", {
        identifier: input,
        password,
      });

      const token = res.data.access;
      localStorage.setItem("token", token);

      // 2️⃣ Descobrir perfil
      const perfilRes = await api.get("/meu-perfil/");
      const perfil = perfilRes.data.perfil;

      localStorage.setItem("perfil", perfil);

      // 3️⃣ Redirecionar corretamente
      if (perfil === "cliente") {
        navigate("/mapa");
      } else if (perfil === "barbearia") {
        navigate("/admin/dashboard");
      } else {
        setError("Perfil não reconhecido");
      }
    } catch (err) {
      setError("CPF/CNPJ ou senha inválidos");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Entrar</h2>

      <input
        type="text"
        placeholder="CPF ou CNPJ"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Entrar</button>
    </form>
  );
}
