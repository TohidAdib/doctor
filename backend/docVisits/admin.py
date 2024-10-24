from django.contrib import admin
from django.contrib.auth.models import User
from .models import Patient


@admin.register(Patient)
class RatingAdmin(admin.ModelAdmin):
    model = Patient
    fields = ["user", "name","national_id","father_name","description","email","visit_date","visit_time"]
    list_display = ["id", "user", "name","national_id","father_name","date"]
    search_fields = ["national_id", "user__username"]
