from django.shortcuts import render,redirect,get_object_or_404
from django.http import HttpResponse,FileResponse,Http404,JsonResponse,HttpResponseBadRequest
from django.contrib.auth.models import auth,User
from django.contrib import messages
from django.contrib.auth import authenticate, login as auth_login
import os
from pathlib import Path
from .models import MyModel,Job,activeJobs
from django.core.files.base import ContentFile
import PyPDF2
import re
import json
import io
import nltk
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
import jwt
import datetime
from .serializers import UserSerializer,MyModelSerializer,JobSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt,csrf_protect

def home(request):
    return render(request,'home.html')

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        password2 = data.get('password2')

        if password == password2:
            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email Already Used'}, status=402)
            elif User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username Already Used'}, status=401)
            else:
                user = User.objects.create_user(username,email,password)
                user.save()
                return JsonResponse({'message': 'Registration successful'}, status=201)
        
        else:
            messages.info(request,'Password Does not match')
            return JsonResponse({'error': 'Password Does not match'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            auth_login(request, user)  

            sessionid = request.session.session_key

            return JsonResponse({'message': 'Login successful', 'sessionid': sessionid})
        else:
            return JsonResponse({'error': 'Invalid Credentials'}, status=401)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
def logout(request):
    response = JsonResponse({'message': 'Logout successful'})
    response.delete_cookie('jwt_token')  

    return response

@api_view(['GET'])
def get_logged_in_user(request):
    session_id = request.COOKIES.get('sessionid')
    print(session_id)
    
    user_id = request.user.id
    username = request.user.username

    print(username+'dsd')
    print('daaa'+request.user.username)
    try:
        user = request.user
        response_data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
       
    
        }
        return Response(response_data)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
from django.core.files.base import ContentFile
from django.db import transaction
from django.core.files.uploadedfile import InMemoryUploadedFile
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_pdf(request):
    try:
        username = request.user.username
        pdf_file = request.data.get('pdf_file')
        overwrite_pdf = request.data.get('overwrite_pdf', False)
        pdf_instance = None

        # Ensure that pdf_file is a bytes object
        if isinstance(pdf_file, bytes):
            with transaction.atomic():
                # Check if a record with the same username already exists
                pdf_instance = MyModel.objects.filter(username=username).first()

                # Get the filename from the request or use a default name like 'file.pdf'
                filename = request.data.get('filename', 'file.pdf')

                if pdf_instance and overwrite_pdf:
                    # If an existing record is found and the user wants to overwrite, update it
                    pdf_instance.pdf_file.save(filename, ContentFile(pdf_file))
                elif not pdf_instance:
                    # If no existing record is found, create a new one
                    pdf_instance = MyModel(username=username)
                    pdf_instance.pdf_file.save(filename, ContentFile(pdf_file))
                    pdf_instance.save()

        if pdf_instance:
            serializer = MyModelSerializer(pdf_instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Failed to upload PDF file.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def getPDF(request, username):
    try:
        pdf_instance = MyModel.objects.filter(username=username).first()
        if pdf_instance is not None and pdf_instance.pdf_file:
            # Assuming pdf_file is a FileField or ImageField in your MyModel
            pdf_file_content = pdf_instance.pdf_file.read()
            return Response(pdf_file_content, content_type='application/pdf')
        else:
            return Response({'error': 'PDF not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserData(request):
    username = request.user.username
    try:
        pdf_instance = MyModel.objects.filter(username=username).first()
        if pdf_instance is not None:
            serializer = MyModelSerializer(pdf_instance)
            return Response(serializer.data)
        else:
            return Response({'error': 'PDF not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# def upload_pdf(request):
#     # Fetch the existing PDF instance for the user's username
#     pdf_instance = None
#     if request.user.is_authenticated:
#         username = request.user.username
#         pdf_instance = MyModel.objects.filter(username=username).first()

#     return render(request, 'uploadPDF.html', {'user': request.user, 'pdf_instance': pdf_instance})


# @api_view(['GET'])
# def view_pdf(request, username):
#     try:
#         my_model_instance = MyModel.objects.get(username=username)
#     except MyModel.DoesNotExist:
#         return HttpResponse('PDF not found', status=404)
    
#     my_model_instance.view_count += 1
#     my_model_instance.save()

#     if my_model_instance.pdf_file:
#         response = HttpResponse(my_model_instance.pdf_file, content_type='application/pdf')
#         response['Content-Disposition'] = f'inline; filename="{username}.pdf"'
#         return response
#     else:
#         return HttpResponse('PDF not found', status=404)

# @api_view(['POST'])
# def save_pdf(request, filename):
#     if request.method == 'POST':
#         pdf_file = request.FILES.get('pdf_file')
#         if pdf_file:
#             pdf_data = pdf_file.read()

#             # Get the username from the form data
#             username = request.POST.get('username')

#             # Get the value of the 'overwrite_pdf' checkbox
#             overwrite_pdf = request.POST.get('overwrite_pdf')

#             # Check if a record with the same username already exists
#             pdf_instance = MyModel.objects.filter(username=username).first()

#             if pdf_instance and overwrite_pdf == 'on':
#                 # If an existing record is found and user wants to overwrite, update it
#                 pdf_instance.pdf_file = pdf_data
#                 pdf_instance.save()
#             elif not pdf_instance:
#                 # If no existing record is found, create a new one
#                 pdf_instance = MyModel(username=username, pdf_file=pdf_data)
#                 pdf_instance.save()

#             print("SUCCESS")
#             return redirect('/')

#     # Fetch the existing PDF instance for the user's username
#     pdf_instance = None
#     if request.user.is_authenticated:
#         username = request.user.username
#         pdf_instance = MyModel.objects.filter(username=username).first()

#     return render(request, 'uploadPDF.html', {'user': request.user, 'pdf_instance': pdf_instance})

# def jobform(request):
#     user_id = request.user.id
#     return render(request,'createjob.html',{'user_id': user_id})

# @api_view(['POST'])
# def add_job_to_profile(request, user_id):
#     user = get_object_or_404(MyModel, pk=user_id)

#     if request.method == 'POST':
#         # Retrieve job details from POST data
#         role = request.POST.get('role')
#         company_name = request.POST.get('company_name')
#         location = request.POST.get('location')
#         stipend_amount = request.POST.get('stipend_amount')
#         job_type = request.POST.get('job_type')
#         application_date = request.POST.get('application_date')
#         status = request.POST.get('status')
#         job_link = request.POST.get('job_link')
#         referred_by = request.POST.get('referred_by')

#         # Create a new job instance
#         job = Job.objects.create(
#             role=role,
#             company_name=company_name,
#             location=location,
#             stipend_amount=stipend_amount,
#             job_type=job_type,
#             application_date=application_date,
#             status=status,
#             job_link=job_link,
#             referred_by=referred_by
#         )

#         # Associate the job with the user
#         user.job_ids.add(job)

#         # Save both user and job objects
#         user.save()
#         job.save()

#         return JsonResponse({'message': 'Job successfully added to the user profile.'})
#CHANGE HERRE
from django.contrib.auth.decorators import login_required
@api_view(['POST'])
# @permission_classes([IsAuthenticated]) 
# @login_required
# @csrf_exempt
def add_job_to_profile(request):
    session_id = request.COOKIES.get('sessionid')
    print(session_id)
    
    user_id = request.user.id
    username = request.user.username
    print(username+'aaaa')
    user = get_object_or_404(MyModel, username=username)

    if request.method == 'POST':
        # Retrieve job details from POST data
        role = request.data.get('role')
        company_name = request.data.get('company_name')
        location = request.data.get('location')
        stipend_amount = request.data.get('stipend_amount')
        job_type = request.data.get('job_type')
        application_date = request.data.get('application_date')
        status = request.data.get('status')
        job_link = request.data.get('job_link')
        referred_by = request.data.get('referred_by')
        print(request.data.get('role'))
#         # Create a new Job instance in the myapp_job table
        job = Job.objects.create(
            role=role,
            company_name=company_name,
            location=location,
            stipend_amount=stipend_amount,
            job_type=job_type,
            application_date=application_date,
            status=status,
            job_link=job_link,
            referred_by=referred_by
        )

        # Add the Job ID to myapp_mymodel_job_ids table
        user.job_ids.add(job)
        print('created')
        if activeJobs.objects.filter(link=job_link).exists():
            return JsonResponse({'error': 'Job link already exists.'}, status=205)
        active_job = activeJobs.objects.create(
            job_id=job,
            reports=0,
            link=job_link
        )


# #         # Save both user and job objects
#         # user.save()
#         # job.save()
        return JsonResponse({'message': 'Job successfully added to the user profile.'},status=210)
    else:
        # Handle other HTTP methods if needed
        return JsonResponse({'message': 'Invalid request method.'}, status=400)
from django.contrib.sessions.models import Session
from django.contrib.auth import get_user_model
def get_username_from_session_id(session_id):
    try:
        # Retrieve the session from the database
        session = Session.objects.get(session_key=session_id)

        # Get the user ID from the session data
        user_id = session.get_decoded().get('_auth_user_id')

        # Get the user object using the user ID
        user = get_user_model().objects.get(pk=user_id)

        # Get the username from the user object
        username = user.username

        return username
    except (Session.DoesNotExist, get_user_model().DoesNotExist, KeyError) as e:
        # Handle exceptions (e.g., session not found, user not found)
        return None
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Job, MyModel
@api_view(['GET'])
def get_all_jobs(request):
    session_id = request.COOKIES.get('sessionid')
    print(session_id)
    
    user_id = request.user.id
    username = request.user.username

    print(username+'dsd')
    print('daaa'+request.user.username)
    # username = get_username_from_session_id(session_id)
    # Get the MyModel instance based on user ID
    user_instance = get_object_or_404(MyModel, username=username)
    print(user_instance.job_ids)
    # Fetch jobs associated with the user using subquery
    jobs = Job.objects.filter(job_id__in=user_instance.job_ids.values('job_id'))
    print(len(jobs))
    print(jobs[0].role)
    # Create a list to store job details
    jobs_array = []
    for job in jobs:
        job_data = {
            'job_id': job.job_id,
            'role': job.role,
            'company_name': job.company_name,
            'location': job.location,
            'stipend_amount': str(job.stipend_amount),
            'job_type': job.job_type,
            'application_date': job.application_date.isoformat(),  # Serialize datetime to ISO format
            'status': job.status,
            'job_link': job.job_link,
            'referred_by': job.referred_by
        }
        jobs_array.append(job_data)
    print(jobs_array)

    # Check if there are jobs, if not, return an empty array
    if not jobs_array:
        return JsonResponse({'jobs': []})

    return JsonResponse({'jobs': jobs_array})

# def getpage(request):
#     user_id = request.user.id
#     return render(request,'getpage.html',{'USER_ID': user_id})


@api_view(['PUT'])
def update_job(request, job_id):
    job = get_object_or_404(Job, pk=job_id)
    serializer = JobSerializer(job, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def delete_job(request, job_id):
    job = get_object_or_404(Job, pk=job_id)
    job.delete()
    return JsonResponse({'message': 'Job successfully deleted.'})

@api_view(['GET'])
def get_job_by_id(request, job_id):
    job = get_object_or_404(Job, pk=job_id)
    job_data = {
        'job_id': job.job_id, 
        'role': job.role,
        'company_name': job.company_name,
        'location': job.location,
        'stipend_amount': str(job.stipend_amount),
        'job_type': job.job_type,
        'application_date': job.application_date.strftime('%Y-%m-%d'),
        'status': job.status,
        'job_link': job.job_link,
        'referred_by': job.referred_by
    }
    return JsonResponse({'job': job_data})

@api_view(['GET'])
def matchskill(request):
    jobdesc=request.query_params.get('jobdesc')
    
    Skills = ["Python", "Java", "R", "JavaScript", "SQL", "HTML", "CSS", "Machine Learning", "TensorFlow", "Pandas", "Seaborn"]
    Required_skills = getskillsfromdesc(jobdesc)
    matched_words = {'skills': []} 

    def search_pdf_for_words(pdf_file, words):

        pdf_file.seek(0)
        pdf_reader = PyPDF2.PdfReader(pdf_file)
            
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text = page.extract_text()

            for word in words:
                # Use regex for case-insensitive search
                pattern = re.compile(re.escape(word), re.IGNORECASE)
                if re.search(pattern, text):
                    if word not in matched_words['skills']:
                        matched_words['skills'].append(word)

    username = request.user.username

    # Fetch the PDF file path from the MyModel instance
    pdf_instance = MyModel.objects.filter(username=username).first()

        
    if pdf_instance and pdf_instance.pdf_file:
        pdf_file_data = pdf_instance.pdf_file
        pdf_file_bytes = io.BytesIO(pdf_file_data)  # Convert bytes data to a file-like object
        search_pdf_for_words(pdf_file_bytes, Skills)
        
       
        matching_skills = list(set(matched_words['skills']) & set(Required_skills))
        percentage_matched = (len(matching_skills) / len(Required_skills)) * 100
          
        print(f"Required_skills are:{Required_skills}")
        print("Skills in Resume: ", matched_words)
        print("Skills that match with required skills:", matching_skills)
        print(f"{percentage_matched:.2f}% of required skills are matched")
    else:
        print("PDF not found for the user.")
    response_data = {
        'required_skills':Required_skills,
        'resume_skills': matched_words,
        'matching_skills': matching_skills,
        'percentage_matched': percentage_matched
    }
    return Response(response_data)

def getskillsfromdesc(jobdesc):
    # Define a list of common skills
    common_skills = ["Python", "Java", "R", "JavaScript", "SQL", "HTML", "CSS", "Machine Learning", "TensorFlow", "Pandas", "Seaborn"]

    # Extract skills from the job description
    extracted_skills = []

    # Tokenize the text
    words = nltk.word_tokenize(jobdesc)

    # Check for skills in the text
    for skill in common_skills:
        # Use regular expression to match skill names
        pattern = re.compile(re.escape(skill), re.IGNORECASE)
        if any(re.search(pattern, word) for word in words):
            extracted_skills.append(skill)

    # Print the extracted skills
    return extracted_skills

from django.shortcuts import get_object_or_404

@api_view(['POST'])
# @permission_classes([IsAuthenticated]) 
# @login_required
# @csrf_exempt
def report_job(request):

    if request.method == 'POST':
        job_link = request.data.get('job_link')

        active_job = get_object_or_404(activeJobs, link=job_link)

        active_job.reports += 1
        active_job.save()


        if active_job.reports >= 5:
            active_job.delete()
            return JsonResponse({'message': 'Job reported and deleted successfully.'})

        return JsonResponse({'message': 'Job reported successfully.'})

    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)
    
def get_all_active_jobs(request):
    active_jobs = activeJobs.objects.all()
    active_jobs_list = []
    for job in active_jobs:
        job_data = {
            'job_id': job.job_id.job_id,
            'role': job.job_id.role,
            'company_name': job.job_id.company_name,
            'location': job.job_id.location,
            'stipend_amount': str(job.job_id.stipend_amount),
            'job_type': job.job_id.job_type,
            'application_date': job.job_id.application_date.strftime('%Y-%m-%d'),
            'status': job.job_id.status,
            'job_link': job.job_id.job_link,
            'referred_by': job.job_id.referred_by,
            'reports': job.reports
        }
        active_jobs_list.append(job_data)
    return JsonResponse({'active_jobs': active_jobs_list})
