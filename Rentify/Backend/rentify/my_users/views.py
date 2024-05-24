from rest_framework import generics, status
from rest_framework.response import Response
from .models import MyUser
from .serializers import MyUserSerializer

class UserCreateView(generics.CreateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = MyUserSerializer

class UserListView(generics.ListAPIView):
    queryset = MyUser.objects.all()
    serializer_class = MyUserSerializer

class UserLoginView(generics.GenericAPIView):
    queryset = MyUser.objects.all()
    serializer_class = MyUserSerializer

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = MyUser.objects.filter(email=email, password=password).first()
        if user:
            return Response({'detail': 'Login successful', 'user_id': user.id,'user_role': user.type_of_user}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MyUser.objects.all()
    serializer_class = MyUserSerializer
  
