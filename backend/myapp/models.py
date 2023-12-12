from django.db import models

# Create your models here.
class Job(models.Model):
    job_id = models.AutoField(primary_key=True)
    role = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    stipend_amount = models.DecimalField(max_digits=10, decimal_places=2)
    job_type = models.CharField(max_length=50)
    application_date = models.DateField()
    status = models.CharField(max_length=50)
    job_link = models.URLField()
    referred_by = models.CharField(max_length=100)  # Referred by user's name
    

class MyModel(models.Model):
    username = models.CharField(max_length=100, default='')
    pdf_file = models.BinaryField()
    view_count = models.PositiveIntegerField(default=0)
    job_ids = models.ManyToManyField(Job, blank=True)  # Many-to-many relationship with Job model

class activeJobs(models.Model):
    job_id = models.ForeignKey('Job', on_delete=models.CASCADE)
    reports = models.IntegerField(default=0)
    link= models.URLField(primary_key=True)