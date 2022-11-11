# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class ConferenceRooms(models.Model):
    id_conference_room = models.IntegerField(primary_key=True)
    number_of_people = models.IntegerField()
    name = models.CharField(max_length=25)

    class Meta:
        app_label = 'rooms'
        managed = False
        db_table = 'conference_rooms'


class Rooms(models.Model):
    id_room = models.IntegerField(primary_key=True)
    number_of_people = models.IntegerField()
    name = models.CharField(max_length=25)

    class Meta:
        app_label = 'rooms'
        managed = False
        db_table = 'rooms'

class roomsRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'rooms':
            return 'rooms'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'rooms':
            return 'rooms'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label == 'rooms' or \
           obj2._meta.app_label == 'rooms':
           return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'rooms':
            return db == 'rooms'
        return None

