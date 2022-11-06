import psycopg2
from psycopg2 import Error
import CRUD


def reservationsCRUD():
    try:
        # connect to PostgreSQL DBMS
        conn = psycopg2.connect("dbname=reservations user=postgres password='betoniarka'")

        # obtain a DB Cursor
        cursor = conn.cursor()
        tableName = "conference_reservation"
        argument = "ID_CONFERENCE, RESERVATION_DATE, FROM_DATE, TO_DATE, NUMBER_OF_PEOPLE, ID_CLIENT, ID_WORKER"
        value = "1, '2022-04-14', '2022-04-15', '2022-04-16', 4, 1, 1"
        conValue = 1
        condition = "ID_CONFERENCE"
        change = 6
        column = "NUMBER_OF_PEOPLE"
        CRUD.insertQuery(cursor, conn, tableName, argument, value)
        CRUD.viewTable(cursor, tableName)
        CRUD.updateQuery(cursor, conn, tableName, column, change, condition, conValue)
        CRUD.viewTable(cursor, tableName)
        CRUD.deleteQuery(cursor, conn, tableName, condition, conValue)
        CRUD.viewTable(cursor, tableName)



    except (Exception, Error) as error:
        print("Error podczas próby połączenia z PostgreSQL", error)
    finally:
        if conn:
            cursor.close()
            conn.close()
            print("PostgreSQL zakończono połączenie")


reservationsCRUD()
