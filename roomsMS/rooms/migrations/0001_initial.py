# Generated by Django 4.1.3 on 2022-11-20 10:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ConferenceRooms',
            fields=[
                ('id_conference_room', models.AutoField(primary_key=True, serialize=False)),
                ('number_of_people', models.IntegerField()),
                ('name', models.CharField(max_length=25)),
            ],
            options={
                'db_table': 'conference_rooms',
            },
        ),
        migrations.CreateModel(
            name='Rooms',
            fields=[
                ('id_room', models.AutoField(primary_key=True, serialize=False)),
                ('number_of_people', models.IntegerField()),
                ('name', models.CharField(max_length=25)),
            ],
            options={
                'db_table': 'rooms',
            },
        ),
    ]
