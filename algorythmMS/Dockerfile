FROM python:3.9.2


ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/algorythmMS

COPY requirements requirements


RUN pip install -U pip

RUN pip install -r requirements/dev.txt

EXPOSE 8000

#CMD python3 manage.py runserver 0.0.0.0:8000
CMD gunicorn --bind 0.0.0.0:8000 settingsMS.wsgi:application  --timeout 1