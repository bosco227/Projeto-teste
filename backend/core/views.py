from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.db.models import Count, Q
from datetime import datetime, time, timedelta
from .permissions import IsBarbearia
from .models import Barbearia, Barbeiro, Agendamento
from .serializers import (
    BarbeariaSerializer,
    BarbeiroSerializer,
    AgendamentoSerializer
)


# =====================
# BARBEARIAS
# =====================
class BarbeariaListView(generics.ListAPIView):
    queryset = Barbearia.objects.all()
    serializer_class = BarbeariaSerializer
    permission_classes = [AllowAny]


class BarbeariaDetailView(generics.RetrieveAPIView):
    queryset = Barbearia.objects.all()
    serializer_class = BarbeariaSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Barbearia.objects.all()


# =====================
# BARBEIROS
# =====================
class BarbeiroListView(generics.ListAPIView):
    serializer_class = BarbeiroSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Barbeiro.objects.filter(
            barbearia_id=self.kwargs['barbearia_id']
        ).annotate(
            total_cortes=Count(
                'agendamentos',
                filter=Q(agendamentos__status='concluido')
            )
        )


class BarbeiroDetailView(generics.RetrieveAPIView):
    serializer_class = BarbeiroSerializer
    permission_classes = [AllowAny]
    queryset = Barbeiro.objects.annotate(
        total_cortes=Count(
            'agendamentos',
            filter=Q(agendamentos__status='concluido')
        )
    )


# =====================
# AGENDAMENTOS
# =====================
class AgendamentoCreateView(generics.CreateAPIView):
    serializer_class = AgendamentoSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(
            cliente=self.request.user,
            status='pendente'
        )


class MeusAgendamentosView(generics.ListAPIView):
    serializer_class = AgendamentoSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Agendamento.objects.filter(
            cliente=self.request.user
        ).order_by('-data_hora')


class BarbeariaAgendamentosView(generics.ListAPIView):
    serializer_class = AgendamentoSerializer
    permission_classes = [IsBarbearia]

    def get_queryset(self):
        return Agendamento.objects.filter(
            barbeiro__barbearia__owner=self.request.user
        ).order_by('-data_hora')


class AtualizarStatusAgendamentoView(APIView):
    permission_classes = [IsBarbearia]

    def patch(self, request, pk):
        try:
            agendamento = Agendamento.objects.get(
                pk=pk,
                barbeiro__barbearia__owner=request.user
            )
        except Agendamento.DoesNotExist:
            return Response(
                {'erro': 'Agendamento não encontrado'},
                status=status.HTTP_404_NOT_FOUND
            )

        novo_status = request.data.get('status')

        if novo_status not in ['confirmado', 'concluido', 'cancelado']:
            return Response(
                {'erro': 'Status inválido'},
                status=status.HTTP_400_BAD_REQUEST
            )

        agendamento.status = novo_status
        agendamento.save()

        return Response(AgendamentoSerializer(agendamento).data)


# =====================
# HORÁRIOS
# =====================
class HorariosDisponiveisView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, barbeiro_id):
        data = request.query_params.get('data')

        if not data:
            return Response(
                {'erro': 'Informe a data no formato YYYY-MM-DD'},
                status=400
            )

        data_base = datetime.strptime(data, '%Y-%m-%d').date()
        inicio = time(9, 0)
        fim = time(18, 0)

        horarios = []
        atual = datetime.combine(data_base, inicio)
        limite = datetime.combine(data_base, fim)

        while atual < limite:
            horarios.append(atual)
            atual += timedelta(hours=1)

        ocupados = Agendamento.objects.filter(
            barbeiro_id=barbeiro_id,
            data_hora__date=data_base,
            status__in=['pendente', 'confirmado']
        ).values_list('data_hora', flat=True)

        livres = [
            h.strftime('%H:%M')
            for h in horarios
            if h not in ocupados
        ]

        return Response(livres)
