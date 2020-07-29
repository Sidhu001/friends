from django.shortcuts import render
from django.views.generic import CreateView
from django.urls import reverse_lazy
from . import forms
# Create your views here.


class SignUp(CreateView):
    form_class = forms.UserCreateForm #Selected form Class
    success_url = reverse_lazy('login') #On succesfull signup redirect to login page
    template_name = 'accounts/signup.html'



