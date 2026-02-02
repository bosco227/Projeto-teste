from django.contrib.auth.backends import ModelBackend
from core.models import PerfilCliente, PerfilBarbearia


class DocumentoAuthBackend(ModelBackend):

    def authenticate(self, request, username=None, password=None, **kwargs):

        if not username or not password:
            return None

        # 🔹 CNPJ (Barbearia / Admin)
        try:
            perfil = PerfilBarbearia.objects.select_related("user").get(cnpj=username)
            user = perfil.user
            if user.check_password(password) and user.is_active:
                return user
        except PerfilBarbearia.DoesNotExist:
            pass

        # 🔹 CPF (Cliente)
        try:
            perfil = PerfilCliente.objects.select_related("user").get(cpf=username)
            user = perfil.user
            if user.check_password(password) and user.is_active:
                return user
        except PerfilCliente.DoesNotExist:
            pass

        return None