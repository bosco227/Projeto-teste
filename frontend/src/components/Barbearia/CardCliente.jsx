export default function CardCliente({ cliente }) {
  return (
    <div className="border p-2 rounded flex justify-between items-center">
      <span>{cliente.nome}</span>
      <span className="text-gray-500">{cliente.total_visitas} visitas</span>
    </div>
  );
}
