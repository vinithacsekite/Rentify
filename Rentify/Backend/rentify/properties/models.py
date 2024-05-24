from django.db import models
from my_users.models import MyUser
from storages.backends.s3boto3 import S3Boto3Storage


class Property(models.Model):
    place = models.CharField(max_length=100)
    square_area = models.DecimalField(max_digits=10, decimal_places=2)
    BHK = models.IntegerField()
    bathroom = models.IntegerField()
    hospitals_nearby = models.CharField(max_length=100, null=True)
    colleges_nearby = models.CharField(max_length=100, null=True)
    photos = models.ImageField(upload_to='rentify_upload/', null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    FURNISHING_CHOICES = [
        ('fully-furnished', 'Fully Furnished'),
        ('semi-furnished', 'Semi Furnished'),
        ('unfurnished', 'Unfurnished'),
    ]
    furnishing = models.CharField(max_length=20, choices=FURNISHING_CHOICES)
    parking = models.BooleanField(default=False)
    owner = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='properties')

    def __str__(self):
        return self.place
