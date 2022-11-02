import psycopg2
from psycopg2 import Error
import CRUD


def reservationsCRUD():
    try:
        # connect to PostgreSQL DBMS
        conn = psycopg2.connect("dbname=reservations user=postgres password='betoniarka'")

        # obtain a DB Cursor
        cursor = conn.cursor()
        tableName = "reservations"
        argument = "ID_RESERVATIONS, RESERVATION_DATE, NO_PEOPLE"
        value = "1, '2022-04-14', 4"
        conValue = 1
        condition = "ID_RESERVATIONS"
        change = 6
        column = "NO_PEOPLE"
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
