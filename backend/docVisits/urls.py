from django.urls import path
from .views import (LogInView,SignInView,AutoVisitView,PatientView,UserView,InformationView,AllPatientView)
urlpatterns = [
    path("signin/",SignInView.as_view()),
    path("login/",LogInView.as_view()),
    path("autovisit/",AutoVisitView.as_view()),
    path("allpatient/",AllPatientView.as_view()),
    path("patient/",PatientView.as_view()),
    path("patient/<int:pk>/",PatientView.as_view()),
    path("user/",InformationView.as_view()),
    path("user/<int:pk>/",UserView.as_view()),
]
