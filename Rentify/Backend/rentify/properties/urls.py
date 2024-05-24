from django.urls import path
from .views import PropertyCreateView, PropertyListView, PropertyDetailView,SendPropertyEmailView

urlpatterns = [
    path('properties/', PropertyListView.as_view(), name='property-list'),
    path('properties/create/', PropertyCreateView.as_view(), name='property-create'),
    path('properties/<int:pk>/', PropertyDetailView.as_view(), name='property-detail'),
    path('properties/send-email/', SendPropertyEmailView.as_view(), name='send-property-email'),
]
