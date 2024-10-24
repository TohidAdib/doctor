from rest_framework import serializers
from .models import Patient
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from datetime import timedelta,datetime

class SignInSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,required=True)
    password2 = serializers.CharField(write_only=True,required=True)
    class Meta:
        model = User
        fields = ["id","username","password","password2"]
    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError("پسوردها یکسان نیستند")
        return data
    def create(self, validated_data):
        validated_data.pop("password2")
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"] 
        )
        return user


class LogInSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {'password': {'write_only': True}} 
    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user is None:
            raise serializers.ValidationError("نام کاربری یا پسورد نادرست است.")
        return data 

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ["id","user","name","national_id","father_name","description","email","visit_date","visit_time","date"]
        extra_kwargs = {'date': {'read_only': True}} 
class UserGetInofSerializer(serializers.ModelSerializer):
    patientUser = PatientSerializer(many=True)
    class Meta:
        model = User
        fields = ["id","username","patientUser","is_staff"]

class AutoVisitSerializer(serializers.Serializer):
    date = serializers.DateField(required=True)
    from_time = serializers.TimeField(required=True)
    to_time = serializers.TimeField(required=True)
    for_time = serializers.TimeField(required=True)

    def validate(self, data):
        from_time = data.get("from_time")
        to_time = data.get("to_time")
        
        if from_time >= to_time:
            raise serializers.ValidationError("لطفا مقادیر درست را وارد کنید")
        
        return data
    
    def visit(self, users):
        for_time_delta = timedelta(hours=self.validated_data["for_time"].hour, minutes=self.validated_data["for_time"].minute)
        
        current_time = self.validated_data["from_time"]
        current_date = self.validated_data["date"]

        for user in users:
            if not (user.visit_date and user.visit_time):
                visit_datetime = datetime.combine(current_date, current_time)
                
                new_visit_datetime = visit_datetime + for_time_delta
                new_visit_time = new_visit_datetime.time()
                new_visit_date = new_visit_datetime.date()

                if current_date <= self.validated_data["date"] and current_time < self.validated_data["to_time"]:
                    user.visit_time = new_visit_time
                    user.visit_date = new_visit_date
                    try:
                        user.save()
                    except Exception as e:
                        raise serializers.ValidationError(f"خطا در ذخیره کاربر: {e}")
                current_time = new_visit_time
                current_date = new_visit_date
    
    def save(self):
        users = Patient.objects.filter(visit_date__isnull=True, visit_time__isnull=True)
        self.visit(users=users)



        