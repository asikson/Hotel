import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# connect to PostgreSQL DBMS
conn = psycopg2.connect("user=postgres password='betoniarka'")
conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)

# obtain a DB Cursor
cursor = conn.cursor()
nameDB = ["users", "reservations", "rooms"]

# create tables statement
for i in nameDB:
    sqlCreateDB = "drop database if exists "+i+""
    # create a table in PostgreSQL database
    cursor.execute(sqlCreateDB)