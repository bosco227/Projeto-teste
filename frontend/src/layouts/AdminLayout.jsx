import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <header>Admin Header</header>
      <Outlet />
    </>
  );
}
