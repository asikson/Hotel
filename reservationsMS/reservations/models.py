from django.db import models
from django.core.validators import MinValueValidator


class ConferenceReservation(models.Model):
    id_conference = models.AutoField(primary_key=True)
    reservation_date = models.DateField()
    from_date = models.DateField()
    to_date = models.DateField()
    number_of_people = models.IntegerField(validators=[MinValueValidator(1)])
    id_client = models.IntegerField()
    id_worker = models.IntegerField()

    class Meta:
        app_label = 'reservations'
        managed = True
        db_table = 'conference_reservation'


class ConferenceRoomReservation(models.Model):
    id_conference_rooms = models.AutoField(primary_key=True)
    id_conference = models.ForeignKey(ConferenceReservation, models.CASCADE, db_column='id_conference')
    id_conference_room = models.IntegerField()

    class Meta:
        managed = True
        db_table = 'conference_room_reservation'



class StayReservation(models.Model):
    id_stay = models.AutoField(primary_key=True)
    reservation_date = models.DateField()
    from_date = models.DateField()
    to_date = models.DateField()
    number_of_people = models.IntegerField(validators=[MinValueValidator(1)])
    check_in = models.DateField(blank=True, null=True)
    check_out = models.DateField(blank=True, null=True)
    id_client = models.IntegerField()
    id_worker = models.IntegerField()

    class Meta:
        app_label = 'reservations'
        managed = True
        db_table = 'stay_reservation'


class StayRoomReservation(models.Model):
    id_stay_rooms = models.AutoField(primary_key=True)
    id_stay = models.ForeignKey(StayReservation, models.CASCADE, db_column='id_stay')
    id_room = models.IntegerField()

    class Meta:
        managed = True
        db_table = 'stay_room_reservation'

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


