// api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/", // ⚠️ já tem barra final
});

// no componente
api.get("/"); // ⚠️ barra final aqui também
