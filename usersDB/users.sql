CREATE TABLE Clients(Id_Client SERIAL PRIMARY KEY NOT NULL,
                          Name VARCHAR(25) NOT NULL,
                          Surname VARCHAR(25) NOT NULL);
CREATE TABLE Workers(Id_Worker SERIAL PRIMARY KEY NOT NULL,
                          Name VARCHAR(25) NOT NULL,
                          Surname VARCHAR(25) NOT NULL,
                          Priviliges BOOLEAN NOT NULL);
CREATE TABLE Credentials(Id_Credential SERIAL PRIMARY KEY NOT NULL, 
                            Login VARCHAR(25) NOT NULL, 
                            Password VARCHAR(25) NOT NULL,
                            Id_Worker INT NOT NULL, 
                            CONSTRAINT FK_1_WORKER
                                FOREIGN KEY (Id_Worker) 
                                REFERENCES Workers (Id_Worker));
CREATE TABLE ClientsCredentials(Id_Credential SERIAL PRIMARY KEY NOT NULL, 
                            Login VARCHAR(25) NOT NULL, 
                            Password VARCHAR(25) NOT NULL,
                            Id_Client INT NOT NULL, 
                            CONSTRAINT FK_1_USER
                                FOREIGN KEY (Id_Client) 
                                REFERENCES Clients (Id_Client));
