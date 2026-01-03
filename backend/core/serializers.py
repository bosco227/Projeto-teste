from rest_framework import serializers
from django.utils import timezone
from datetime import datetime
from .models import User, Barbearia, Barbeiro, Agendamento


# =========================
# USER
# =========================
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'tipo']


# =========================
# BARBEIRO (com contador de cortes)
# =========================
class BarbeiroSerializer(serializers.ModelSerializer):
    total_cortes = serializers.IntegerField(read_only=True)

    class Meta:
        model = Barbeiro
        fields = [
            'id',
            'nome',
            'foto_url',
            'especialidade',
            'bio',
            'total_cortes'
        ]


# =========================
# BARBEARIA
# =========================
class BarbeariaSerializer(serializers.ModelSerializer):
    barbeiros = BarbeiroSerializer(many=True, read_only=True)

    class Meta:
        model = Barbearia
        fields = [
            'id',
            'nome_fantasia',
            'endereco',
            'latitude',
            'longitude',
            'barbeiros'
        ]


# =========================
# AGENDAMENTO
# =========================
class AgendamentoSerializer(serializers.ModelSerializer):
    cliente = serializers.ReadOnlyField(source='cliente.id')
    status = serializers.ReadOnlyField()

    class Meta:
        model = Agendamento
        fields = [
            'id',
            'cliente',
            'barbeiro',
            'data_hora',
            'status'
        ]

    def validate(self, data):
        barbeiro = data.get('barbeiro')
        data_hora = data.get('data_hora')

        # 1️⃣ Barbeiro válido
        if not barbeiro or not barbeiro.barbearia:
            raise serializers.ValidationError(
                'Barbeiro inválido'
            )

        # 2️⃣ Não permitir agendamento no passado
        if data_hora < timezone.now():
            raise serializers.ValidationError(
                'Não é possível agendar no passado'
            )

        # 3️⃣ Conflito de horário
        conflito = Agendamento.objects.filter(
            barbeiro=barbeiro,
            data_hora=data_hora,
            status__in=['pendente', 'confirmado']
        ).exists()

        if conflito:
            raise serializers.ValidationError(
                'Este horário já está ocupado'
            )

        return data
