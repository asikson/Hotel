CREATE TABLE Conference_Reservation(Id_Conference SERIAL PRIMARY KEY NOT NULL,
                          Reservation_Date DATE NOT NULL,
                          From_Date DATE NOT NULL,
                          To_Date DATE NOT NULL,
                          Number_Of_People INT NOT NULL,
                          Id_Client INT NOT NULL,
                          Id_Worker INT NOT NULL);
CREATE TABLE Conference_Room_Reservation(Id_Conference_Rooms SERIAL PRIMARY KEY NOT NULL,
                                Id_Conference INT NOT NULL,
                                Id_Conference_Room INT NOT NULL,
                                CONSTRAINT FK_1_CONFERENCER
                                    FOREIGN KEY (Id_Conference) 
                                    REFERENCES Conference_Reservation (Id_Conference));
CREATE TABLE Stay_Reservation(Id_Stay SERIAL PRIMARY KEY NOT NULL,
                          Reservation_Date DATE NOT NULL,
                          From_Date DATE NOT NULL,
                          To_Date DATE NOT NULL,
                          Number_Of_People INT NOT NULL,
                          Check_In DATE,
                          Check_OUT DATE,
                          Id_Client INT NOT NULL,
                          Id_Worker INT NOT NULL);
CREATE TABLE Stay_Room_Reservation(Id_Stay_Rooms SERIAL PRIMARY KEY NOT NULL,
                                Id_Stay INT NOT NULL,
                                Id_Room INT NOT NULL,
                                CONSTRAINT FK_1_CONFERENCER
                                    FOREIGN KEY (Id_Stay) 
                                    REFERENCES Stay_Reservation (Id_Stay));