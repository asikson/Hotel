import psycopg2
from psycopg2 import Error



def executeDB(cursor, conn, tableQuery):
    cursor.execute(tableQuery)
    conn.commit()
    print("Utworzono tabele")


def users():
    try:
        # connect to PostgreSQL DBMS
        conn = psycopg2.connect("dbname=users user=postgres password='betoniarka'")

        # obtain a DB Cursor
        cursor = conn.cursor()

        peopleQuery = '''CREATE TABLE people
                  (ID_PEOPLE INT PRIMARY KEY NOT NULL,
                  NAME VARCHAR(25) NOT NULL,
                  SURNAME VARCHAR(25) NOT NULL); '''
        executeDB(cursor, conn, peopleQuery)

        cursor.execute("DROP table IF EXISTS clients")
        clientsQuery = '''CREATE TABLE clients
                          (ID_CLIENTS INT PRIMARY KEY NOT NULL,
                          CLIENT BOOLEAN DEFAULT TRUE,
                          CONSTRAINT FK_ID_CLIENTS FOREIGN KEY (ID_CLIENTS) REFERENCES people (ID_PEOPLE)); '''
        executeDB(cursor, conn, clientsQuery)

        cursor.execute("DROP table IF EXISTS workers")
        workersQuery = '''CREATE TABLE workers
                          (ID_WORKERS INT PRIMARY KEY NOT NULL,
                          WORKER BOOLEAN DEFAULT TRUE,
                          CONSTRAINT FK_ID_WORKERS FOREIGN KEY (ID_WORKERS) REFERENCES people (ID_PEOPLE)); '''
        executeDB(cursor, conn, workersQuery)

        cursor.execute("DROP table IF EXISTS credentials")
        credentialsQuery = '''CREATE TABLE credentials (ID_CREDENTIALS INT PRIMARY KEY NOT NULL, LOGIN VARCHAR(25) 
        NOT NULL, PASSWORD VARCHAR(25) NOT NULL, CONSTRAINT FK_ID_CREDENTIALS FOREIGN KEY (ID_CREDENTIALS) REFERENCES 
        workers (ID_WORKERS)); '''
        executeDB(cursor, conn, credentialsQuery)


    except (Exception, Error) as error:
        print("Error podczas próby połączenia z PostgreSQL", error)
    finally:
        if conn:
            cursor.close()
            conn.close()
            print("PostgreSQL zakończono połączenie")


