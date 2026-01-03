from django.urls import path
from .views import (
    BarbeariaListView,
    BarbeiroDetailView,
    BarbeiroListView,
    AgendamentoCreateView,
    HorariosDisponiveisView,
    MeusAgendamentosView,
    BarbeariaAgendamentosView,
    AtualizarStatusAgendamentoView
)

urlpatterns = [
    # Lista todas as barbearias
    path('', BarbeariaListView.as_view(), name='barbearia-list'),

    # Barbeiros de uma barbearia
    path('<int:barbearia_id>/barbeiros/', BarbeiroListView.as_view(), name='barbeiro-list'),

    # Detalhe de um barbeiro específico
    path('barbeiros/<int:pk>/', BarbeiroDetailView.as_view(), name='barbeiro-detail'),

    # Criar agendamento
    path('agendamentos/', AgendamentoCreateView.as_view(), name='agendamento-create'),

    # Meus agendamentos
    path('meus-agendamentos/', MeusAgendamentosView.as_view(), name='meus-agendamentos'),

    # DASHBOARD
    path('dashboard/agendamentos/', BarbeariaAgendamentosView.as_view(), name='dashboard-agendamentos'),
    path('dashboard/agendamentos/<int:pk>/status/', AtualizarStatusAgendamentoView.as_view(), name='dashboard-agendamento-status'),

    # Horários disponíveis de um barbeiro
    path('barbeiros/<int:barbeiro_id>/horarios/', HorariosDisponiveisView.as_view(), name='horarios-disponiveis'),
]
