# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class ConferenceReservation(models.Model):
    id_conference = models.IntegerField(primary_key=True)
    reservation_date = models.DateField()
    from_date = models.DateField()
    to_date = models.DateField()
    number_of_people = models.IntegerField()
    id_client = models.IntegerField()
    id_worker = models.IntegerField()

    class Meta:
        app_label = 'reservations'
        managed = False
        db_table = 'conference_reservation'


class ConferenceRoomReservation(models.Model):
    id_conference = models.OneToOneField(ConferenceReservation, models.DO_NOTHING, db_column='id_conference', primary_key=True)
    id_conference_room = models.IntegerField()

    class Meta:
        app_label = 'reservations'
        managed = False
        db_table = 'conference_room_reservation'
        unique_together = (('id_conference', 'id_conference_room'),)


class StayReservation(models.Model):
    id_stay = models.IntegerField(primary_key=True)
    reservation_date = models.DateField()
    from_date = models.DateField()
    to_date = models.DateField()
    number_of_people = models.IntegerField()
    check_in = models.DateField(blank=True, null=True)
    check_out = models.DateField(blank=True, null=True)
    id_client = models.IntegerField()
    id_worker = models.IntegerField()

    class Meta:
        app_label = 'reservations'
        managed = False
        db_table = 'stay_reservation'


class StayRoomReservation(models.Model):
    id_stay = models.OneToOneField(StayReservation, models.DO_NOTHING, db_column='id_stay', primary_key=True)
    id_room = models.IntegerField()

    class Meta:
        app_label = 'reservations'
        managed = False
        db_table = 'stay_room_reservation'
        unique_together = (('id_stay', 'id_room'),)

class reservationsRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'reservations':
            return 'reservations'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'reservations':
            return 'reservations'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label == 'reservations' or \
           obj2._meta.app_label == 'reservations':
           return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'reservations':
            return db == 'reservations'
        return None


