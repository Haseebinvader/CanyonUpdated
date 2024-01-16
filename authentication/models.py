from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.hashers import make_password
from django.utils.text import slugify

class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)


class Customer(AbstractBaseUser, PermissionsMixin):

    first_name = models.CharField(max_length=200, blank=True, null=True)
    last_name = models.CharField(max_length=200, blank=True, null=True)
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    addressLine1 = models.CharField(max_length=200, blank=True, null=True)
    addressLine2 = models.CharField(max_length=200, blank=True, null=True)
    city = models.CharField(max_length=200, blank=True, null=True)
    state = models.CharField(max_length=200, blank=True, null=True)
    country = models.CharField(max_length=200, blank=True, null=True)
    postalCode = models.PositiveBigIntegerField(blank=True, null=True)
    phoneNumber = models.PositiveBigIntegerField(blank=True, null=True)
    customer_id = models.CharField(max_length=550, unique=True)
    blocked = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'addressLine1',
                       'addressLine2', 'city', 'postalCode', 'phoneNumber']

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        if not self.pk:
            original_name = slugify(self.name)
            similar_names = Customer.objects.filter(
                name__icontains=original_name)

            if similar_names.exists():
                similar_names_count = similar_names.count()
                new_name = f"{original_name}_WEB_{similar_names_count + 1}"
                self.name = new_name

            # Hash the password before saving
            self.password = make_password(self.password)

        super(Customer, self).save(*args, **kwargs)

# class NumberSeries(models.Model):
