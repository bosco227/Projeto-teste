import { Outlet } from "react-router-dom";

export default function ClienteLayout() {
  return (
    <>
      <header>Cliente Header</header>
      <Outlet />
    </>
  );
}
