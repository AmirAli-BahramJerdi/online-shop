"""
ASGI config for shop_project project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'shop_project.settings.local')

application = get_asgi_application()

