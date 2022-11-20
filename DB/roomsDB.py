import psycopg2
from psycopg2 import Error


def executeDB(cursor, conn, tableQuery):
    cursor.execute(tableQuery)
    conn.commit()
    print("Utworzono tabele")


def rooms():
    try:
        # connect to PostgreSQL DBMS
        conn = psycopg2.connect("dbname=rooms user=postgres password='betoniarka'")

        # obtain a DB Cursor
        cursor = conn.cursor()

        roomsQuery = '''CREATE TABLE Rooms
                          (Id_Room SERIAL PRIMARY KEY NOT NULL,
                          Number_Of_People INT NOT NULL,
                          Name VARCHAR(25) NOT NULL); '''
        executeDB(cursor, conn, roomsQuery)

        conferencesQuery = '''CREATE TABLE Conference_Rooms
                          (Id_Conference_Room SERIAL PRIMARY KEY NOT NULL,
                          Number_Of_People INT NOT NULL,
                          Name VARCHAR(25) NOT NULL); '''
        executeDB(cursor, conn, conferencesQuery)


    except (Exception, Error) as error:
        print("Error podczas próby połączenia z PostgreSQL ", error)
    finally:
        if conn:
            cursor.close()
            conn.close()
            print("PostgreSQL zakończono połączenie")


