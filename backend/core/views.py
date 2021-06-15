from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render, redirect
from .forms import LoginForm
from django.contrib import auth

def home(request):
  # return redirect('/dashboard')
  return render(request, 'home.html')

def signin(request):
  if request.method == 'POST':
    if 'error' in request.session:
      del request.session['error']
    form = LoginForm(request.POST)
    if form.is_valid():
      cd = form.cleaned_data
      user =auth.authenticate(username=cd['email'], password=cd['password'])
      if user is not None:
          if user.is_active:
            auth.login(request, user)
            return redirect('/dashboard')
          else:
            return HttpResponse('Disabled account')
      else:
        request.session['error'] = 'Invalid credentials'
        return redirect('/login')
  form = LoginForm()
  return render(request, 'login.html', {'form': form})


def signout(request):
  auth.login(request)
  return HttpResponseRedirect('/')
