# core/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser


# =========================
# USER CUSTOMIZADO
# =========================
class User(AbstractUser):
    TIPO_USUARIO = (
        ('cliente', 'Cliente'),
        ('barbearia', 'Barbearia'),
    )
    tipo = models.CharField(max_length=20, choices=TIPO_USUARIO)

    def is_cliente(self):
        return self.tipo == 'cliente'

    def is_barbearia(self):
        return self.tipo == 'barbearia'

class PerfilCliente(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='perfil_cliente'
    )
    cpf = models.CharField(max_length=11, unique=True)

class PerfilBarbearia(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='perfil_barbearia'
    )
    cnpj = models.CharField(max_length=14, unique=True)
    
# =========================
# BARBEARIA
# =========================
class Barbearia(models.Model):
    owner = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='barbearia',
        null=True,
        blank=True
    )
    nome_fantasia = models.CharField(max_length=100)
    endereco = models.CharField(max_length=255, blank=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=8, null=True, blank=True)
    longitude = models.DecimalField(max_digits=11, decimal_places=8, null=True, blank=True)

    def __str__(self):
        return self.nome_fantasia


# =========================
# BARBEIRO
# =========================
class Barbeiro(models.Model):
    barbearia = models.ForeignKey(
        Barbearia,
        on_delete=models.CASCADE,
        related_name='barbeiros'
    )
    nome = models.CharField(max_length=100)
    foto_url = models.URLField(blank=True, null=True)
    especialidade = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True, null=True)

    def total_cortes(self):
        return self.agendamentos.filter(status='concluido').count()

    def __str__(self):
        return self.nome



# =========================
# AGENDAMENTO
# =========================
class Agendamento(models.Model):
    STATUS_CHOICES = (
        ('pendente', 'Pendente'),
        ('confirmado', 'Confirmado'),
        ('concluido', 'Concluído'),
        ('cancelado', 'Cancelado'),
    )

    cliente = models.ForeignKey(
    User,
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name='agendamentos'
)

    barbeiro = models.ForeignKey(
        Barbeiro,
        on_delete=models.CASCADE,
        related_name='agendamentos'
    )
    data_hora = models.DateTimeField()
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pendente'
    )

    class Meta:
        unique_together = ('barbeiro', 'data_hora')
        ordering = ['-data_hora']

    def __str__(self):
        return f"{self.barbeiro.nome} - {self.data_hora.strftime('%Y-%m-%d %H:%M')}"