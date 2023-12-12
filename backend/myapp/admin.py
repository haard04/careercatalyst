from django.contrib import admin
from .models import MyModel,activeJobs

# Register your models here.
admin.site.register(MyModel)
from django.contrib import admin
from .models import Job

class JobAdmin(admin.ModelAdmin):
    list_display = ('role', 'company_name', 'location', 'stipend_amount', 'job_type', 'application_date', 'status')
    # Add other fields you want to display in the list view

# Register the Job model with its admin class
admin.site.register(Job, JobAdmin)

admin.site.register(activeJobs)