from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from .models import Property
from .serializers import PropertySerializer
from my_users.models import MyUser
from django.conf import settings

class PropertyCreateView(generics.CreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

class PropertyListView(generics.ListAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

class SendPropertyEmailView(APIView):
 def post(self, request, *args, **kwargs):
        property_id = request.data.get('property_id')
        buyer_details = request.data.get('buyer_details')
        seller_details = request.data.get('seller_details')

        try:
            property = Property.objects.get(id=property_id)

            # Send email to seller
            seller_message = (
                f'Hello {seller_details["name"]},\n\n'
                f'Your property located at {property.place} has been interested by a potential buyer. '
                f'Below are the details of the interested buyer:\n\n'
                f'Buyer Email: {buyer_details["email"]}\n\n'
                f'Buyer Phone Number: {buyer_details["phone"]}\n'
                f'Buyer Name: {buyer_details["name"]}\n\n'
        
                f'Thank you.'
            )
            send_mail(
                'Your Property was Interested by a Buyer',
                seller_message,
                settings.EMAIL_HOST_USER,
                [seller_details["email"]],
                fail_silently=False,
            )

            # Send email to buyer
            buyer_message = (
                f'Hello{buyer_details["name"]},\n\n'
                f'Congratulations! The owner of the property you are interested in has been notified about your interest. '
                f'Below are the details of the property owner:\n\n'
                f'Seller Email: {seller_details["email"]}\n'
                f'Seller Phone Number: {seller_details["phone"]}\n'
                f'Seller Name: {seller_details["name"]}\n\n\n'
                f'Property Details:\n'
                f'Square Area: {property.square_area}\n'
                f'BHK: {property.BHK}\n'
                f'Bathrooms: {property.bathroom}\n'
                f'Hospitals Nearby: {property.hospitals_nearby}\n'
                f'Colleges Nearby: {property.colleges_nearby}\n'
                f'Price: {property.price}\n'
                f'Furnishing: {property.furnishing}\n'
                f'Parking: {property.parking}\n\n'
                f'Please contact the seller for further discussion.\n\n\n'
                f'Thank you.'
            )
            send_mail(
                'Owner Details of the Property You Are Interested In',
                buyer_message,
                settings.EMAIL_HOST_USER,
                [buyer_details['email']],
                fail_silently=False,
            )

            return Response({'status': 'Emails sent successfully'}, status=status.HTTP_200_OK)
        except Property.DoesNotExist:
            return Response({'error': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)