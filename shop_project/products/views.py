from django.views.generic import ListView, DetailView, TemplateView
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Category, Product

class HomeView(TemplateView):
    """نمایش صفحه اصلی"""
    template_name = 'products/home.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        context['featured_products'] = Product.objects.filter(available=True)[:8]
        return context


class ProductListView(ListView):
    """نمایش لیست محصولات با قابلیت فیلتر و جستجو"""
    model = Product
    template_name = 'products/product_list.html'
    context_object_name = 'page_obj'
    paginate_by = 12
    
    def get_queryset(self):
        queryset = Product.objects.filter(available=True)
        
        # filtering
        category_slug = self.request.GET.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        
        # searching
        search_query = self.request.GET.get('q')
        if search_query:
            queryset = queryset.filter(
                Q(name__contains=search_query) | 
                Q(description__contains=search_query)
            )
        
        # sorting
        sort_by = self.request.GET.get('sort', 'newest')
        if sort_by == 'price_low':
            queryset = queryset.order_by('price')
        elif sort_by == 'price_high':
            queryset = queryset.order_by('-price')
        else: 
            queryset = queryset.order_by('-created_at')
            
        return queryset
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        context['current_category'] = self.request.GET.get('category')
        context['current_sort'] = self.request.GET.get('sort', 'newest')
        context['search_query'] = self.request.GET.get('q')
        return context


class ProductDetailView(DetailView):
    """نمایش جزئیات یک محصول"""
    model = Product
    template_name = 'products/product_detail.html'
    context_object_name = 'product'
    slug_url_kwarg = 'slug'
    
    def get_queryset(self):
        return Product.objects.filter(available=True)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # محصولات مرتبط
        product = self.get_object()
        context['related_products'] = Product.objects.filter(
            category=product.category, 
            available=True
        ).exclude(id=product.id)[:4]
        return context


class CategoryDetailView(ListView):
    """نمایش محصولات یک دسته‌بندی خاص"""
    model = Product
    template_name = 'products/category_detail.html'
    context_object_name = 'page_obj'
    paginate_by = 12
    
    def get_queryset(self):
        self.category = get_object_or_404(Category, slug=self.kwargs['slug'])
        return Product.objects.filter(category=self.category, available=True)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['category'] = self.category
        return context

