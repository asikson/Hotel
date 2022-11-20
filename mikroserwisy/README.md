Baza działa na PostgreSQL 15, nie sprawdzana na starszych.
Przy instalacji bazy proponuje zostawić użytkownika 'postgres' i hasło ustawić 'betoniarka'
W przeciwnym razie zmienić wartości tych danych w:
DB/createDB.py
DB/roomsDB.py
DB/reservationsDB.py
DB/usersDB.py
DB/dropDB.py - przydaje sie do aktualizacji bazy później
mikroserwisy/mikroserwisy/settings.py - w DATABASES dla wszystych baz

Potrzebne pakiety:  
django 
djangorestframework 
django-filter
psycopg2  

Aktualizacja bazy:
Odpalić DB/createDB.py

Odpalianie servera:
Znajdować się w folderze mikroserwisy komenda:
python manage.py runserver

Linki:  
Szablony:  
/nazwa_mikroserwisu/nazwa_tabeli/ - wyświetlanie wszystkich  
/nazwa_mikroserwisu/nazwa_tabeli/?(nazwa atrybutu)=(wartość)&(nazwa atrybutu)=(wartość)
/nazwa_mikroserwisu/nazwa_tabeli/create - tworzenie nowego rekordu do bazy  
/nazwa_mikroserwisu/nazwa_tabeli/delete/<int: pk> - usuwanie konkretnego po kluczu głównym  
/nazwa_mikroserwisu/nazwa_tabeli/update/<int: pk> - modyfikowanie konkretnego po kluczu głównym  


tabele userMS:  
/users/clients  atrybuty: id_client, name, surname,
/users/workers  atrybuty: id_worker, name, surname, priviliges
/users/credentials  atrybuty: brak // do zmiany przy logowaniu

tabele roomMS:  
/rooms/rooms/  atrybuty: id_room, number_of_people,
/rooms/conferencerooms/  atrybuty: id_conference_room, number_of_people,

tabele reservationsMS:  
/reservations/conferencereservation  atrybuty: id_conference //reszta do ustalenia
/reservations/conferenceroomreservation  atrybuty: id_conference
/reservations/stayreservation  atrybuty: id_stay //reszta do ustalenia
/reservations/stayroomreservation  atrybuty: id_stay
