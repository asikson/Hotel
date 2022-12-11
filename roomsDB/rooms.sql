CREATE TABLE Rooms(Id_Room SERIAL PRIMARY KEY NOT NULL,
                          Number_Of_People INT NOT NULL,
                          Standard INT NOT NULL,
                          Name VARCHAR(25) NOT NULL);
CREATE TABLE Conference_Rooms(Id_Conference_Room SERIAL PRIMARY KEY NOT NULL,
                          Number_Of_People INT NOT NULL,
                          Name VARCHAR(25) NOT NULL);
