
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import MyModel,Job

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')  # Include any other fields you want to expose


class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyModel
        fields = ('username', 'pdf_file', 'view_count', 'job_ids')

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('job_id', 'role', 'company_name', 'location', 'stipend_amount', 'job_type', 'application_date', 'status', 'job_link', 'referred_by')
        read_only_fields = ('job_id',)  # Make 'job_id' field read-only

    # def create(self, validated_data):
    #     # Get the authenticated user from the request context
    #     user = self.context['request'].user

    #     # Create the Job instance
    #     job = Job.objects.create(**validated_data)

    #     # Get the MyModel instance from the request context
    #     mymodel_instance = self.context.get('mymodel_instance')

    #     # Add the job to the MyModel instance
    #     mymodel_instance.job_ids.add(job)

    #     return job

    def update(self, instance, validated_data):
        """
        Update and return an existing Job instance, given the validated data.
        """
        instance.role = validated_data.get('role', instance.role)
        instance.company_name = validated_data.get('company_name', instance.company_name)
        instance.location = validated_data.get('location', instance.location)
        instance.stipend_amount = validated_data.get('stipend_amount', instance.stipend_amount)
        instance.job_type = validated_data.get('job_type', instance.job_type)
        instance.application_date = validated_data.get('application_date', instance.application_date)
        instance.status = validated_data.get('status', instance.status)
        instance.job_link = validated_data.get('job_link', instance.job_link)
        instance.referred_by = validated_data.get('referred_by', instance.referred_by)
        instance.save()
        return instance