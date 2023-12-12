from django.urls import path
from . import views

urlpatterns = [
    # path('',views.home,name='home'),
    # path('signup',views.signup,name='signup'),
    # path('login',views.login,name='login'),
    # path('logout',views.logout,name='logout'),
    # path('view/<str:username>/', views.view_pdf, name='view_pdf'),
    # path('save/<str:filename>/', views.save_pdf, name='save_pdf'),
    # path('upload/', views.upload_pdf, name='upload_pdf'),
    # path('jobpage',views.jobform,name='jobform'),
    # path('add_job_to_profile/<int:user_id>/', views.add_job_to_profile, name='add_job_to_profile'),
    # path('get_all_jobs/<int:user_id>/', views.get_all_jobs, name='get_all_jobs'),
    # path('getpage',views.getpage,name='getpage'),
    # path('updatejob/<int:job_id>/', views.update_job, name='update_job'),
    # path('deletejob/<int:job_id>/', views.delete_job, name='delete_job'),
    # path('getjob/<int:job_id>/', views.get_job_by_id, name='get_job_by_id'),
    # path('match',views.matchskill,name='matchskill'),
    path('',views.home,name='home'),
    path('signup', views.signup, name='signup'),
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('get_logged_in_user', views.get_logged_in_user, name='get_logged_in_user'),
    # path('upload_pdf', views.upload_pdf, name='upload_pdf'),
    # path('get_pdf/<str:username>', views.getPDF, name='get_pdf'),
    # path('get_userData', views.getUserData, name='get_pdf'),
    path('addJobToProfile',views.add_job_to_profile,name='add_job_to_profile'),
    path('deletejob/<int:job_id>',views.delete_job,name='delete_job'),
    path('getjobsbyid',views.get_all_jobs,name='get_all_jobs'),
    path('getJobbyId/<int:job_id>',views.get_job_by_id,name='get_job_by_id'),
    path('matchSkills',views.matchskill,name='matchskill'),
    path('updatejob/<int:job_id>', views.update_job, name='update_job'),
    path('report-job/', views.report_job, name='report_job'),
    path('getJobopportunities',views.get_all_active_jobs,name='get_all_active_jobs')
] 

