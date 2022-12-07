from django.db import models


class Clients(models.Model):
    id_client = models.AutoField(primary_key=True)
    name = models.CharField(max_length=25)
    surname = models.CharField(max_length=25)

    class Meta:
        app_label =  'users'
        managed = True
        db_table = 'clients'

class Clientscredentials(models.Model):
    id_credential = models.AutoField(primary_key=True)
    login = models.CharField(max_length=25)
    password = models.CharField(max_length=25)
    id_client = models.ForeignKey(Clients, models.DO_NOTHING, db_column='id_client')

    class Meta:
        managed = True
        db_table = 'clientscredentials'


class Credentials(models.Model):
    id_credential = models.AutoField(primary_key=True)
    login = models.CharField(max_length=25)
    password = models.CharField(max_length=25)
    id_worker = models.ForeignKey('Workers', models.DO_NOTHING, db_column='id_worker')

    class Meta:
        app_label =  'users'
        managed = True
        db_table = 'credentials'


class Workers(models.Model):
    id_worker = models.AutoField(primary_key=True)
    name = models.CharField(max_length=25)
    surname = models.CharField(max_length=25)
    priviliges = models.IntegerField()

    class Meta:
        app_label =  'users'
        managed = True
        db_table = 'workers'


class usersRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'users':
            return 'users'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'users':
            return 'users'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label == 'users' or \
           obj2._meta.app_label == 'users':
           return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'users':
            return db == 'users'
        return None