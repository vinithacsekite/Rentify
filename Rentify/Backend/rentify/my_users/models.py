from django.db import models

class MyUser(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=10)
    password = models.CharField(max_length=100)
    TYPE_CHOICES = [
        ('seller', 'Seller'),
        ('buyer', 'Buyer'),
    ]
    type_of_user = models.CharField(max_length=10, choices=TYPE_CHOICES)

    def __str__(self):
        return self.email
