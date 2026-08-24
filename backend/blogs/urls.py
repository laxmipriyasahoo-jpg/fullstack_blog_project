from django.urls import path
from .views import RegisterView, BlogListCreateView, BlogDetailView, MyBlogsView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("blogs/", BlogListCreateView.as_view(), name="blogs"),
    path("blogs/<int:pk>/", BlogDetailView.as_view(), name="blog-detail"),
    path("my-blogs/", MyBlogsView.as_view(), name="my-blogs"),
]
