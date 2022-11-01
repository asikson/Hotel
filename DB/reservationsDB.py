import psycopg2
from psycopg2 import Error


def executeDB(cursor, conn, tableQuery):
    cursor.execute(tableQuery)
    conn.commit()
    print("Utworzono tabele")


def reservations():
    try:
        # connect to PostgreSQL DBMS
        conn = psycopg2.connect("dbname=reservations user=postgres password='betoniarka'")

        # obtain a DB Cursor
        cursor = conn.cursor()

        reservationQuery = '''CREATE TABLE reservations
                  (ID_RESERVATIONS INT PRIMARY KEY NOT NULL,
                  RESERVATION_DATE DATE NOT NULL,
                  NO_PEOPLE INT NOT NULL); '''
        executeDB(cursor, conn, reservationQuery)

        cursor.execute("DROP table IF EXISTS conference")
        conferenceQuery = '''CREATE TABLE conference
                          (ID_CONFERENCE INT PRIMARY KEY NOT NULL,
                          RENTAL_TIME TIME,
                          CONSTRAINT FK_ID_CONFERENCE FOREIGN KEY (ID_CONFERENCE) REFERENCES reservations (ID_RESERVATIONS)); '''
        executeDB(cursor, conn, conferenceQuery)

        cursor.execute("DROP table IF EXISTS rooms")
        roomsQuery = '''CREATE TABLE rooms
                          (ID_ROOMS INT PRIMARY KEY NOT NULL,
                          FROM_DATE DATE NOT NULL,
                          TO_DATE DATE NOT NULL,
                          CHECK_IN DATE NOT NULL,
                          CHECK_OUT DATE NOT NULL,
                          CONSTRAINT FK_ID_ROOMS FOREIGN KEY (ID_ROOMS) REFERENCES reservations (ID_RESERVATIONS)); '''
        executeDB(cursor, conn, roomsQuery)


    except (Exception, Error) as error:
        print("Error podczas próby połączenia z PostgreSQL", error)
    finally:
        if conn:
            cursor.close()
            conn.close()
            print("PostgreSQL zakończono połączenie")


