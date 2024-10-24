from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone 

class Patient(models.Model):
    user = models.ForeignKey(User, related_name="patientUser", on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    national_id = models.CharField(max_length=10)
    father_name = models.CharField(max_length=150)
    description = models.CharField(max_length=500, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    visit_date = models.DateField(blank=True, null=True) 
    visit_time = models.TimeField(blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return f"{self.name}_{self.user}"

