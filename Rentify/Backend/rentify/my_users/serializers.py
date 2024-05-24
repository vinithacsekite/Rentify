from rest_framework import serializers
from .models import MyUser

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'password', 'type_of_user']
        extra_kwargs = {
            'password': {'write_only': True}
        }
