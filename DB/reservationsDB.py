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
        
        conferenceQuery = '''CREATE TABLE Conference_Reservation
                          (Id_Conference INT PRIMARY KEY NOT NULL,
                          Reservation_Date DATE NOT NULL,
                          From_Date DATE NOT NULL,
                          To_Date DATE NOT NULL,
                          Number_Of_People INT NOT NULL,
                          Id_Client INT NOT NULL,
                          Id_Worker INT NOT NULL); '''
        executeDB(cursor, conn, conferenceQuery)

        conferenceRoomQuery = '''CREATE TABLE Conference_Room_Reservation
                                (Id_Conference INT NOT NULL,
                                Id_Conference_Room INT NOT NULL,
                                CONSTRAINT FK_1_CONFERENCER
                                    FOREIGN KEY (Id_Conference) 
                                    REFERENCES Conference_Reservation (Id_Conference),
                                CONSTRAINT PK_CONFERENCE_ROOM_RESERVATION
                                    PRIMARY KEY (Id_Conference, Id_Conference_Room)); '''
        executeDB(cursor, conn, conferenceRoomQuery)

        stayQuery = '''CREATE TABLE Stay_Reservation
                          (Id_Stay INT PRIMARY KEY NOT NULL,
                          Reservation_Date DATE NOT NULL,
                          From_Date DATE NOT NULL,
                          To_Date DATE NOT NULL,
                          Number_Of_People INT NOT NULL,
                          Check_In DATE,
                          Check_OUT DATE,
                          Id_Client INT NOT NULL,
                          Id_Worker INT NOT NULL); '''
        executeDB(cursor, conn, stayQuery)

        stayRoomQuery = '''CREATE TABLE Stay_Room_Reservation
                                (Id_Stay INT NOT NULL,
                                Id_Room INT NOT NULL,
                                CONSTRAINT FK_1_CONFERENCER
                                    FOREIGN KEY (Id_Stay) 
                                    REFERENCES Stay_Reservation (Id_Stay),
                                CONSTRAINT PK_STAY_ROOM_RESERVATION
                                    PRIMARY KEY (Id_Stay, Id_Room)); '''
        executeDB(cursor, conn, stayRoomQuery)



    except (Exception, Error) as error:
        print("Error podczas próby połączenia z PostgreSQL ", error)
    finally:
        if conn:
            cursor.close()
            conn.close()
            print("PostgreSQL zakończono połączenie")


