from django.urls import path
from .views import UserCreateView, UserListView, UserLoginView,UserDetailView

urlpatterns = [
    path('users/register/', UserCreateView.as_view(), name='user-create'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/login/', UserLoginView.as_view(), name='user-login'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
]
