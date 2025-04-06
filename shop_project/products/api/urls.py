from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, ProductViewSet,
    CategoryListAPIView, CategoryDetailAPIView,
    ProductListAPIView, ProductDetailAPIView
)

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
   
    # api urls:
        path('api/categories/', CategoryListAPIView.as_view(), name='category-list-api'),
        path('api/categories/<slug:slug>/', CategoryDetailAPIView.as_view(), name='category-detail-api'),
        path('api/products-list/', ProductListAPIView.as_view(), name='product-list-api'),
        path('api/products-detail/<slug:slug>/', ProductDetailAPIView.as_view(), name='product-detail-api'),
]

