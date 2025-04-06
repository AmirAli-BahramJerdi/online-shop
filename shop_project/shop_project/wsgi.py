"""
WSGI config for shop_project project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'shop_project.settings.local')

application = get_wsgi_application()

