from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from simple_history.models import HistoricalRecords

class UserAccountManager(BaseUserManager):
    # Metodo que registra el usuario
    def create_user(self, nick_name, password=None, **extra_fields):
        
        user = self.model(nick_name=nick_name, **extra_fields)
        
        user.set_password(password)
        user.save()
               
        return user
    
    # Metodo que registra el usuario administrador
    def create_superuser(self, nick_name, password=None, **extra_fields):
        user = self.create_user(nick_name, password, **extra_fields)
        
        user.is_superuser = True
        user.is_staff = True
        user.save()
        
        return user
    
    
class UserAccount(AbstractBaseUser, PermissionsMixin):
    class Meta:
        verbose_name = 'Cuenta de Usuario'
        verbose_name_plural = 'Cuentas de Usuarios'
    
    nick_name = models.CharField(
        unique=True,
        max_length=255,
        verbose_name='Alias'
    )
    
    first_name = models.CharField(
        max_length=255,
        verbose_name='Nombre'
    )
    
    last_name = models.CharField(
        max_length=255,
        verbose_name='Apellidos'
    )
    
    is_active = models.BooleanField(
        default=True,
        verbose_name='Activo',
    )
    
    is_staff = models.BooleanField(
        default=False,
    )
    
    create_date = models.DateTimeField(
        verbose_name='Fecha de creado',
        auto_now_add=True
    )
    
    history = HistoricalRecords()
    objects = UserAccountManager()
    
    USERNAME_FIELD = 'nick_name'
    REQUIRED_FIELDS = [
        'first_name', 
        'last_name', 
    ]

    def get_full_name(self):
        return self.first_name + " " + self.last_name
    
    def get_short_name(self):
        return self.first_name
    
    def __str__(self):
        return self.nick_name
