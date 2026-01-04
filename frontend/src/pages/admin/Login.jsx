import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await api.post("/auth/login/", { email, senha });
      localStorage.setItem("token", res.data.access);
      api.defaults.headers.Authorization = `Bearer ${res.data.access}`;
      navigate("/admin/dashboard");
    } catch {
      alert("Login inválido");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Login Barbearia</h1>

      <input
        className="w-full border p-2 rounded"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        type="password"
        placeholder="Senha"
        onChange={(e) => setSenha(e.target.value)}
      />

      <button
        className="w-full bg-black text-white py-2 rounded"
        onClick={login}
      >
        Entrar
      </button>
    </div>
  );
}
