import psycopg2
from psycopg2 import Error


def executeDB(cursor, conn, tableQuery):
    cursor.execute(tableQuery)
    conn.commit()
    print("Utworzono tabele")


def rooms():
    try:
        # connect to PostgreSQL DBMS
        conn = psycopg2.connect("dbname=users user=postgres password='betoniarka'")

        # obtain a DB Cursor
        cursor = conn.cursor()

        roomsQuery = '''CREATE TABLE rooms
                  (ID_ROOMS INT PRIMARY KEY NOT NULL,
                  NAME VARCHAR(25) NOT NULL,
                  NO_PEOPLE INT NOT NULL); '''
        executeDB(cursor, conn, roomsQuery)

        cursor.execute("DROP table IF EXISTS room")
        roomQuery = '''CREATE TABLE room
                          (ID_ROOM INT PRIMARY KEY NOT NULL,
                          STANDARD VARCHAR(25) NOT NULL,
                          CONSTRAINT FK_ID_ROOM FOREIGN KEY (ID_ROOM) REFERENCES rooms (ID_ROOMS)); '''
        executeDB(cursor, conn, roomQuery)

        cursor.execute("DROP table IF EXISTS conference")
        conferenceQuery = '''CREATE TABLE conference
                          (ID_CONFERENCE INT PRIMARY KEY NOT NULL,
                          SIZE BOOLEAN DEFAULT TRUE,
                          CONSTRAINT FK_ID_CONFERENCE FOREIGN KEY (ID_CONFERENCE) REFERENCES rooms (ID_ROOMS)); '''
        executeDB(cursor, conn, conferenceQuery)


    except (Exception, Error) as error:
        print("Error podczas próby połączenia z PostgreSQL", error)
    finally:
        if conn:
            cursor.close()
            conn.close()
            print("PostgreSQL zakończono połączenie")


