from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import (
    Barbearia,
    Barbeiro,
    Agendamento,
    User,
    PerfilBarbearia,
    PerfilCliente
)


# =========================
# LOGIN (CPF ou CNPJ)
# =========================
class LoginSerializer(serializers.Serializer):
    identificador = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        identificador = data["identificador"]
        password = data["password"]

        if len(identificador) == 11:
            try:
                perfil = PerfilCliente.objects.select_related("user").get(
                    cpf=identificador
                )
            except PerfilCliente.DoesNotExist:
                raise serializers.ValidationError("CPF não encontrado")

        elif len(identificador) == 14:
            try:
                perfil = PerfilBarbearia.objects.select_related("user").get(
                    cnpj=identificador
                )
            except PerfilBarbearia.DoesNotExist:
                raise serializers.ValidationError("CNPJ não encontrado")

        else:
            raise serializers.ValidationError("Identificador inválido")

        user = authenticate(
            username=perfil.user.username,
            password=password
        )

        if not user:
            raise serializers.ValidationError("Senha inválida")

        # 🔥 ISSO É O PONTO-CHAVE
        return {
            "user": user
        }
    

# =========================
# USER (básico)
# =========================
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "tipo"]


# =========================
# BARBEIRO
# =========================
class BarbeiroSerializer(serializers.ModelSerializer):
    total_cortes = serializers.IntegerField(read_only=True)

    class Meta:
        model = Barbeiro
        fields = [
            "id",
            "nome",
            "foto_url",
            "especialidade",
            "bio",
            "total_cortes",
        ]


# =========================
# BARBEARIA
# =========================
class BarbeariaSerializer(serializers.ModelSerializer):
    barbeiros = BarbeiroSerializer(many=True, read_only=True)

    class Meta:
        model = Barbearia
        fields = [
            "id",
            "nome_fantasia",
            "endereco",
            "latitude",
            "longitude",
            "barbeiros",
        ]


# =========================
# AGENDAMENTO
# =========================
class AgendamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agendamento
        fields = ["id", "barbeiro", "data_hora", "status"]
        read_only_fields = ["status"]