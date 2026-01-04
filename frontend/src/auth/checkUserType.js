// src/auth/checkUserType.js
export function checkUserType(tipoEsperado) {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.tipo === tipoEsperado;
  } catch {
    return false;
  }
}
