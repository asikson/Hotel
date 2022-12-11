FROM python:3.9.2


ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/reservationsMS

COPY requirements requirements


RUN pip install -U pip

RUN pip install -r requirements/dev.txt

EXPOSE 8001

CMD python3 manage.py runserver 0.0.0.0:8001