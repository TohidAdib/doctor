from django.shortcuts import render,get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.throttling import UserRateThrottle
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import (PatientSerializer,AutoVisitSerializer,UserGetInofSerializer,SignInSerializer,LogInSerializer)
from .models import Patient
from django.contrib.auth.models import User

# Create your views here.

class SignInView(APIView):
    throttle_classes = [UserRateThrottle]
    
    def post(self, request):
        serializer = SignInSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogInView(APIView):
    throttle_classes = [UserRateThrottle]
    def post(self, request):      
        user = get_object_or_404(User, username=request.data["username"])
        if not user.check_password(request.data["password"]):
            return Response({"detail": "Incorrect password"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = LogInSerializer(instance=user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, JWTAuthentication]

    def get(self, request,pk):
        user = get_object_or_404(User, pk=pk) 
        serializer = UserGetInofSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class InformationView(APIView):
    authentication_classes = [SessionAuthentication, JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserGetInofSerializer(user,context={"request":request})
        return Response(serializer.data, status=status.HTTP_200_OK)
class AllPatientView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication,JWTAuthentication]
    def get(self,request):
        patient = Patient.objects.all()
        serializer = PatientSerializer(patient,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class PatientView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication,JWTAuthentication]

    def get(self,request,pk):
        patient = get_object_or_404(Patient,pk=pk)
        serializer = PatientSerializer(patient)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def put(self,request,pk):
        patient = get_object_or_404(Patient,pk=pk)
        serializer = PatientSerializer(patient,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class AutoVisitView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication,JWTAuthentication]

    def post(self,request):
        serializer = AutoVisitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)