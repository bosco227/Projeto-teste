export default function CardAgendamento({
  agendamento,
  onConfirmar,
  onConcluir,
}) {
  return (
    <div className="border p-3 rounded flex justify-between items-center">
      <div>
        <p className="font-semibold">{agendamento.cliente_nome}</p>
        <p className="text-gray-600">
          {new Date(agendamento.data_hora).toLocaleString("pt-BR")}
        </p>
        <p className="text-sm">Status: {agendamento.status}</p>
      </div>
      <div className="flex flex-col gap-1">
        {agendamento.status === "pendente" && (
          <button
            onClick={() => onConfirmar(agendamento.id)}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Confirmar
          </button>
        )}
        {agendamento.status !== "concluido" && (
          <button
            onClick={() => onConcluir(agendamento.id)}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Concluir
          </button>
        )}
      </div>
    </div>
  );
}
