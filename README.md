
# 🛍 Django فروشگاه آنلاین جامع با + API

در این پروژه، هدف اصلی این است که کار با APIها، مدل‌های محصولات، و نحوه ایجاد و مدیریت محصولات از طریق API را یاد بگیرید.
---

## 📌 ویژگی‌های اصلی
- 🛒 **مدیریت پیشرفته محصولات**
- 🏷 **دسته‌بندی‌های چندسطحی و پویا**
- 🔍 **جستجوی پیشرفته در میان محصولات**
- 💳 **سبد خرید و پرداخت اینترنتی** (در آینده)
- ⭐ **سیستم امتیازدهی و نظردهی کاربران** (در آینده)
- 📱 **طراحی واکنش‌گرا (Responsive) برای تمامی دستگاه‌ها**
- 🔐 **احراز هویت و مدیریت کاربران** (در آینده)
- 📊 **داشبورد مدیریتی قدرتمند** 

---

## 🛠 فناوری‌های استفاده‌شده

| بخش | ابزار |
|-----|-------|
| **Backend** | Django 5.2 + Django REST Framework |
| **Frontend** | Bootstrap 5  |
| **پایگاه‌داده** | PostgreSQL (برای پروداکشن) / SQLite (برای توسعه) |
| **ابزارهای جانبی** | Docker 🐳، Celery 🔄، SendGrid 📧، Sentry 📊 |

---

## ⚙️ راه‌اندازی پروژه

### 🔧 حالت توسعه (Development)
```bash
# 1. کلون کردن مخزن پروژه
git clone https://github.com/AmirAli-BahramJerdi/online-shop.git
cd shop-project

# 2. ساخت محیط مجازی
```bash
python -m venv venv
source venv/bin/activate  # Linux/MacOS
venv\Scripts\activate     # Windows

# 3. نصب وابستگی‌ها
pip install -r requirements/dev.txt

# 4. کپی فایل تنظیمات محیطی
cp .env.example .env

# 5. اجرای مهاجرت‌ها و راه‌اندازی سرور
python manage.py migrate
python manage.py runserver
```

### 🚀 حالت پروداکشن (Optional)
```bash
docker-compose up -d --build
```

---

## 📁 ساختار پروژه (نسخه به‌روزشده)

```
📦 shop_project/
├── db.sqlite3                  # پایگاه داده SQLite برای توسعه
├── manage.py                   # فایل اصلی برای اجرای دستورات جنگو
├── requirements.txt            # نیازمندی‌های پروژه (کتابخانه‌ها)

├── 📂 media/                   # فایل‌های آپلودی (تصاویر محصولات و دسته‌بندی‌ها)
│   ├── 📂 categories/          # تصاویر دسته‌بندی‌ها
│   └── 📂 products/            # تصاویر محصولات

├── 📂 products/                # اپلیکیشن محصولات
│   ├── admin.py                # تنظیمات ادمین
│   ├── apps.py                 # تنظیمات اپلیکیشن
│   ├── models.py               # مدل‌های دیتابیس محصولات
│   ├── tests.py                # تست‌های اپلیکیشن
│   ├── urls.py                 # مسیرهای URL مربوط به محصولات
│   ├── views.py                # نمایه‌ها و پردازش درخواست‌ها
│   └── __init__.py             # فایل اولیه برای این اپ
│
│   ├── 📂 api/                 # API مربوط به محصولات
│   │   ├── serializers.py      # سریالایزرها برای API
│   │   ├── urls.py             # مسیرهای API
│   │   └── views.py            # ویوهای API
│   │
│   ├── 📂 migrations/          # مایگریشن‌های پایگاه داده
│   └── __pycache__/            # پوشه کدهای کامپایل‌شده Python
│
├── 📂 shop_project/            # پروژه اصلی
│   ├── asgi.py                 # تنظیمات ASGI برای اجرای اپلیکیشن
│   ├── urls.py                 # مسیرهای URL اصلی پروژه
│   ├── wsgi.py                 # تنظیمات WSGI برای استقرار
│   └── __init__.py             # فایل اولیه برای پروژه
│
│   ├── 📂 settings/            # تنظیمات پروژه
│   │   ├── base.py             # تنظیمات پایه پروژه
│   │   ├── local.py            # تنظیمات برای محیط توسعه
│   │   ├── production.py       # تنظیمات برای محیط تولید
│   │   └── __init__.py         # فایل اولیه برای تنظیمات
│   │
│   └── __pycache__/            # پوشه کدهای کامپایل‌شده Python
│
├── 📂 static/                  # فایل‌های استاتیک (CSS، تصاویر، JavaScript)
│   ├── 📂 css/                 # استایل‌ها (مثلاً main.css)
│   ├── 📂 img/                 # تصاویر (مثل عکس‌های سایت)
│   └── 📂 js/                  # اسکریپت‌های جاوا اسکریپت (main.js)

└── 📂 templates/               # قالب‌های HTML
    ├── base.html               # قالب اصلی برای صفحات
    └── 📂 products/            # قالب‌های مرتبط با محصولات
        ├── category_detail.html  # صفحه جزئیات دسته‌بندی
        ├── home.html           # صفحه اصلی فروشگاه
        ├── product_detail.html  # صفحه جزئیات محصول
        └── product_list.html    # صفحه لیست محصولات


```

---

## 🌐 نمونه‌ای از API

```
GET    /api/products/          → دریافت لیست محصولات
POST   /api/products/          → ایجاد محصول جدید
GET    /api/products/{id}/     → مشاهده جزئیات یک محصول
PUT    /api/products/{id}/     → ویرایش محصول
DELETE /api/products/{id}/     → حذف محصول

GET    /api/categories/        → دریافت دسته‌بندی‌ها
POST   /api/cart/add/          → افزودن محصول به سبد خرید
```

---

## 🔄 محیط‌های مختلف

| محیط     | پایگاه داده | DEBUG | کاربرد              |
|----------|-------------|-------|----------------------|
| توسعه     | SQLite       | ✅ True | پیاده‌سازی و افزودن ویژگی جدید |
| تست       | PostgreSQL   | ❌ False | بررسی صحت عملکرد سیستم         |
| پروداکشن     | PostgreSQL   | ❌ False | اجرا روی سرور اصلی             |

---

## 🧩 توسعه و سفارشی‌سازی

### افزودن یک اپلیکیشن جدید:
```bash
python manage.py startapp new_feature
```

سپس در `settings/base.py`:
```python
LOCAL_APPS += ['new_feature']

### ویرایش قالب‌ها:
```html
{% extends "base.html" %}
{% block content %}
    <!-- محتوای سفارشی شما -->
{% endblock %}
```

---

## 📚 مستندات پروژه

- 📘 [مستندات رسمی Django](https://docs.djangoproject.com/en/stable/)
- 📗 [مستندات Django REST Framework](https://www.django-rest-framework.org/)

---

## 🤝 مشارکت در توسعه

1. پروژه را Fork کنید.
2. یک شاخه جدید بسازید:  
   `git checkout -b feature/your-feature-name`
3. تغییرات را ذخیره کنید:  
   `git commit -m 'افزودن ویژگی جدید'`
4. تغییرات را Push کنید:  
   `git push origin feature/your-feature-name`
5. یک Pull Request ارسال کنید.

---

---

## 📞 راه‌های ارتباطی

- ✉️ ایمیل: `amiralibahramjerdi@gmail.com`
- 📸 اینستاگرام: [instagram.com/amirali_bj](https://instagram.com/amirali_bj)
- 🔹 تلگرام: [amirali_bj](https://t.me/amirali_bj)

