from rest_framework import serializers
from .models import Barbearia, Barbeiro, Agendamento, User


# =========================
# USER (básico)
# =========================
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'tipo']


# =========================
# BARBEIRO
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
    class Meta:
        model = Agendamento
        fields = ['id', 'barbeiro', 'data_hora', 'status']
        read_only_fields = ['status']
