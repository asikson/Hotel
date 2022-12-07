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
                          (Id_Client SERIAL PRIMARY KEY NOT NULL,
                          Name VARCHAR(25) NOT NULL,
                          Surname VARCHAR(25) NOT NULL); '''
        executeDB(cursor, conn, clientsQuery)

        workersQuery = '''CREATE TABLE Workers
                          (Id_Worker SERIAL PRIMARY KEY NOT NULL,
                          Name VARCHAR(25) NOT NULL,
                          Surname VARCHAR(25) NOT NULL,
                          Priviliges BOOLEAN NOT NULL); '''
        executeDB(cursor, conn, workersQuery)

        credentialsQuery = '''CREATE TABLE Credentials
                            (Id_Credential SERIAL PRIMARY KEY NOT NULL, 
                            Login VARCHAR(25) NOT NULL, 
                            Password VARCHAR(25) NOT NULL,
                            Id_Worker INT NOT NULL, 
                            CONSTRAINT FK_1_WORKER
                                FOREIGN KEY (Id_Worker) 
                                REFERENCES Workers (Id_Worker)); '''
        executeDB(cursor, conn, credentialsQuery)

        credentialsClientsQuery = '''CREATE TABLE ClientsCredentials
                            (Id_Credential SERIAL PRIMARY KEY NOT NULL, 
                            Login VARCHAR(25) NOT NULL, 
                            Password VARCHAR(25) NOT NULL,
                            Id_Client INT NOT NULL, 
                            CONSTRAINT FK_1_USER
                                FOREIGN KEY (Id_Client) 
                                REFERENCES Clients (Id_Client)); '''
        executeDB(cursor, conn, credentialsClientsQuery)



    except (Exception, Error) as error:
        print("Error podczas próby połączenia z PostgreSQL ", error)
    finally:
        if conn:
            cursor.close()
            conn.close()
            print("PostgreSQL zakończono połączenie")


