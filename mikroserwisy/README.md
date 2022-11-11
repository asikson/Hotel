Potrzebne pakiety:  
django djangorestframework psycopg2  

Najpierw odpalić createDB.py  

Linki:  
Szablony:  
/nazwa_mikroserwisu/nazwa_tabeli/ - wyświetlanie wszystkich  
/nazwa_mikroserwisu/nazwa_tabeli/<int: pk> - wyświetlanie konkretnego po kluczu głównym  
/nazwa_mikroserwisu/nazwa_tabeli/create - tworzenie nowego rekordu do bazy  
/nazwa_mikroserwisu/nazwa_tabeli/delete/<int: pk> - usuwanie konkretnego po kluczu głównym  
/nazwa_mikroserwisu/nazwa_tabeli/update/<int: pk> - modyfikowanie konkretnego po kluczu głównym  


tabele userMS:  
/users/clients  
/users/workers  
/user/credentials  

tabele roomMS:  
/rooms/rooms/  
/rooms/conferencerooms/  

tabele reservationsMS:  
/reservations/conferencereservation  
/reservations/conferenceroomreservation  
/reservations/stayreservation  
/reservations/stayroomreservation  