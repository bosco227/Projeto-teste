from django.urls import path
from .views import (
    BarbeariaDetailView,
    BarbeariaListView,
    BarbeiroDetailView,
    BarbeiroListView,
    AgendamentoCreateView,
    HorariosDisponiveisView,
    MeusAgendamentosView,
    BarbeariaAgendamentosView,
    AtualizarStatusAgendamentoView,
    MeuPerfilView,
    login_view,
)

urlpatterns = [
    path('barbearias/', BarbeariaListView.as_view(), name='barbearia-list'),
    path('barbearias/<int:pk>/', BarbeariaDetailView.as_view(), name='barbearia-detail'),
    path('barbearias/<int:barbearia_id>/barbeiros/', BarbeiroListView.as_view()),
    path('barbeiros/<int:pk>/', BarbeiroDetailView.as_view()),
    path('agendamentos/', AgendamentoCreateView.as_view()),
    path('meus-agendamentos/', MeusAgendamentosView.as_view()),
    path('dashboard/agendamentos/', BarbeariaAgendamentosView.as_view()),
    path('dashboard/agendamentos/<int:pk>/status/', AtualizarStatusAgendamentoView.as_view()),
    path('barbeiros/<int:barbeiro_id>/horarios/', HorariosDisponiveisView.as_view()),
    path("meu-perfil/", MeuPerfilView.as_view()),
    path("login/", login_view),
]

