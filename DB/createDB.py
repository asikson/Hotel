import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import reservationsDB
import usersDB
import roomsDB

# connect to PostgreSQL DBMS
conn = psycopg2.connect("user=postgres password='betoniarka'")
conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)

# obtain a DB Cursor
cursor = conn.cursor()
nameDB = ["Users", "Reservations", "Rooms"]

# create tables statement
for i in nameDB:
    sqlCreateDB = "create database "+i+""
    # create a table in PostgreSQL database
    cursor.execute(sqlCreateDB)

usersDB.users()
reservationsDB.reservations()
roomsDB.rooms()

