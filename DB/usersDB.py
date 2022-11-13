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

        clientsQuery = '''CREATE TABLE Clients
                          (Id_Client INT PRIMARY KEY NOT NULL,
                          Name VARCHAR(25) NOT NULL,
                          Surname VARCHAR(25) NOT NULL); '''
        executeDB(cursor, conn, clientsQuery)

        workersQuery = '''CREATE TABLE Workers
                          (Id_Worker INT PRIMARY KEY NOT NULL,
                          Name VARCHAR(25) NOT NULL,
                          Surname VARCHAR(25) NOT NULL,
                          Priviliges INT NOT NULL); '''
        executeDB(cursor, conn, workersQuery)

        credentialsQuery = '''CREATE TABLE Credentials
                            (Id_Credential INT PRIMARY KEY NOT NULL, 
                            Login VARCHAR(25) NOT NULL, 
                            Password VARCHAR(25) NOT NULL,
                            Id_Worker INT NOT NULL, 
                            CONSTRAINT FK_1_WORKER
                                FOREIGN KEY (Id_Worker) 
                                REFERENCES Workers (Id_Worker)); '''
        executeDB(cursor, conn, credentialsQuery)


    except (Exception, Error) as error:
        print("Error podczas próby połączenia z PostgreSQL ", error)
    finally:
        if conn:
            cursor.close()
            conn.close()
            print("PostgreSQL zakończono połączenie")


