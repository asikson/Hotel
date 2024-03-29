# Generated by Django 4.1.3 on 2022-11-20 10:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Clients',
            fields=[
                ('id_client', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=25)),
                ('surname', models.CharField(max_length=25)),
            ],
            options={
                'db_table': 'clients',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Credentials',
            fields=[
                ('id_credential', models.IntegerField(primary_key=True, serialize=False)),
                ('login', models.CharField(max_length=25)),
                ('password', models.CharField(max_length=25)),
            ],
            options={
                'db_table': 'credentials',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Workers',
            fields=[
                ('id_worker', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=25)),
                ('surname', models.CharField(max_length=25)),
                ('priviliges', models.IntegerField()),
            ],
            options={
                'db_table': 'workers',
                'managed': False,
            },
        ),
    ]
