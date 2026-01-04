import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ padding: "16px" }}>
      <h1>Dashboard da Barbearia</h1>

      <ul>
        <li>
          <Link to="/admin/agendamentos">📅 Agendamentos</Link>
        </li>
      </ul>
    </div>
  );
}
