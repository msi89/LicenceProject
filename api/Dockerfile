FROM python:3.8-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /django
COPY requirements.txt requirements.txt
RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r requirements.txt
COPY . .
RUN chmod +x /django/script.sh