import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    api
      .post("/token/", {
        username,
        password,
      })
      .then((res) => {
        const { access } = res.data;

        localStorage.setItem("token", access);
        api.defaults.headers.Authorization = `Bearer ${access}`;

        navigate("/admin/dashboard");
      })
      .catch(() => {
        setErro("Usuário ou senha inválidos");
      });
  }

  return (
    <div style={{ padding: "16px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Login da Barbearia</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", marginBottom: "8px" }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "8px" }}
        />

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        <button type="submit" style={{ width: "100%" }}>
          Entrar
        </button>
      </form>
    </div>
  );
}
