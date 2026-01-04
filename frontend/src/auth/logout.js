export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/"; // redireciona para home ou login
}
