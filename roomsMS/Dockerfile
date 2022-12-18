FROM python:3.9.2


ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/roomsMS

COPY requirements requirements


RUN pip install -U pip

RUN pip install -r requirements/dev.txt

EXPOSE 8002

#CMD python3 manage.py runserver 0.0.0.0:8002
CMD gunicorn --bind 0.0.0.0:8002 settingsMS.wsgi:application --timeout 1