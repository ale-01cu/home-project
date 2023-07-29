import os
from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-rsh@wvoth+y&y(qek!ac8bjfmlwf^lv24wzllgnc^1hds0u_v('

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

BASE_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
LOCAL_APPS = [
    'apps.catalogue',
    'apps.category',
    'apps.search',
    'apps.lists',
    'apps.user',
]
THIRD_APPS = [
    'rest_framework',
    'corsheaders',
    'django_filters',
    'djoser',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
]

INSTALLED_APPS = BASE_APPS + LOCAL_APPS + THIRD_APPS


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

#WSGI_APPLICATION = 'core.wsgi.application'
ASGI_APPLICATION = "core.asgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]



LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True



STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://localhost:3080",
    "http://localhost:5173",
]

CORS_ALLOW_ALL_ORIGINS = True

REST_FRAMEWORK = {
}
AUTH_USER_MODEL = 'user.UserAccount'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend']
}

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    #'social_core.backends.google.GoogleOAuth2',
)


SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": ("Bearer",),
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_TOKEN_CLASSES": (
        "rest_framework_simplejwt.tokens.AccessToken",
    ),

    "ALGORITHM": "HS256",

    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
}


DJOSER = {
    'LOGIN_FIELD': 'username',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': False,
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': False,
    'SEND_CONFIRMATION_EMAIL': False,
    'SEND_ACTIVATION_EMAIL': False,
    'SET_USERNAME_RETYPE': False,
    'SET_PASSWORD_RETYPE': False,
    'PASSWORD_RESET_SHOW_EMAIL_NOT_FOUND': True,
    'PASSWORD_RESET_CONFIRM_RETYPE': False,
    'PASSWORD_RESET_CONFIRM_URL': '#/password/reset/confirm/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': '#/email/reset/confirm/{uid}/{token}',
    'ACTIVATION_URL': '#',
    'SOCIAL_AUTH_TOKEN_STRATEGY': 'djoser.social.token.jwt.TokenStrategy',
    'SOCIAL_AUTH_ALLOWED_REDIRECT_URIS': ['http://localhost:8000/google'],
    'SERIALIZERS': {
        'user_create': 'apps.user.serializers.UserCreateSerializer', 
        'user': 'apps.user.serializers.UserCreateSerializer',   
        'current_user': 'apps.user.serializers.UserCreateSerializer',
        'user_delete': 'djoser.serializers.UserDeleteSerializer',
    },
}

ACCOUNT_ACTIVATION_DAYS = 0
EMAIL_BACKEND='django.core.mail.backends.console.EmailBackend'
