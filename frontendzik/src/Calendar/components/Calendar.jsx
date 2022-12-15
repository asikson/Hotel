import { useState } from 'react';
import styles from '../styles/calendarStyles';
import ShowReservationTopBar from './ShowReservationTopBar';
import ShowListTable from './ShowListTable';
import { getItems} from '../../utils/api';
import LoadingOverlay from '../../generic/components/LoadingOverlay';
import { useEffect } from 'react';


import React from 'react'
import { render } from 'react-dom'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from "react-icons/io";
import { DAYS, MONTHS } from "./const";
import { areDatesTheSame, getDateObject, getDaysInMonth, getDaysInWeek, getSortedDays, range } from "./utils";
import {format,startOfWeek,addDays,isSameDay,lastDayOfWeek,getWeek,addWeeks,subWeeks} from "date-fns";
import CalendarListTable from './CalendarListTable';
import ListTable from '../../generic/components/ListTable';

const tab = ['Pokój 1', 'Pokój 2']

const labels = {
    'stay': {
        id_room: 'Id pokoju',
        name : 'Nazwa',
    },
    'conference': {
        id_conference: 'Id konferencji',
        name: 'Nazwa',
    },
}


const Calendar = ({workerId}) => {

    const [toggleKey, setToggleKey] = useState('stay');
    const [loading, setLoading] = useState(true);
    

    const [stayItems, setStayItems] = useState([]);
    const [conferenceItems, setConferenceItems] = useState([]);
    const [clients, setClients] = useState([]);
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);



    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        if (toggleKey === 'conference') {
            setItems(conferenceItems);
        } else {
            setItems(stayItems);
        }
    }, [stayItems, conferenceItems]);

    useEffect(() => {
        const currentItems = toggleKey === 'conference' ? conferenceItems : stayItems;
        setItems(currentItems);
        setCurrentItem(null);  
    }, [toggleKey]);

    const refresh = () => {
        getItems(`rooms/rooms/`).then(response => {
       // getItems(`reservations/stayreservation/`).then(response => {
            setStayItems(response);
            setLoading(false);
        });
        getItems(`rooms/conferencerooms/`).then(response => {
            setConferenceItems(response);
            setLoading(false);
        });
    };



  ///////
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));


  const changeWeekHandle = (btnType) => {
    //console.log("current week", currentWeek);
    if (btnType === "prev") {
      //console.log(subWeeks(currentMonth, 1));
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      //console.log(addWeeks(currentMonth, 1));
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  
  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    
    return (
      <div style={styles.styledHeader}>

        <div className="icon" onClick={() => changeWeekHandle("prev")}>
          <IoIosArrowDropleftCircle/>
            </div>

          <span>{format(currentMonth, dateFormat)} / week {currentWeek}</span>
        
        <div onClick={() => changeWeekHandle("next")}>
          <div className="icon">
            <IoIosArrowDroprightCircle/> 
          </div>
          </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    days.push(
      <div className="col col-center" key={0}>
        Pokoje
      </div>
    );
    
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row" style={styles.styledWeek}>{days}</div>;
  };


  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    for (let j=0; j < tab.length; j++){
      let day = startOfWeek(currentMonth, {weekStartsOn: 1})
      let days = [];
      days.push(
        <div
   
        className={`col cell ${
          isSameDay(day, new Date())
          ? "today"
          : ""
        }`}
        key={0}
        >
        {tab[j]}
        </div>
      );
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        days.push(
          <div
            className={`col cell ${
              isSameDay(day, new Date())
                ? "today"
                : ""
            }`}
            key={day}
          >
            <span className="number" style={styles.styled}>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }}

      rows.push(
        <div className="row" key={day} style={styles.styledDay}>
          {days}
        </div>
      );
      days = [];
    } 
    return <div className="body" >
        {rows}
        
   </div>
  };

  ///////// create 3 obiect JSON and show in table 
  const[rooms, setRooms] = useState([])
  const[reservation_rooms, setReservationRooms] = useState([])
  const [stay_rooms, setStayRooms] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const url_rooms = "http://127.0.0.1:8000/rooms/rooms/"
  const url_reservation_rooms = 'http://127.0.0.1:8000/reservations/stayreservation/'
  const url_stay_rooms = 'http://127.0.0.1:8000/reservations/stayroomreservation/'

const fetchDataRooms = () => {
  setIsLoading(true)
  fetch(url_rooms)
  .then(response => {
    return response.json()
  })
  .then(data => {
    setIsLoading(false)
    setRooms(data)
  })
}


const fetchDataReservationRooms = () => {
  setIsLoading(true)
  fetch(url_reservation_rooms)
  .then(response => {
    return response.json()
  })
  .then(data => {
    setIsLoading(false)
    setReservationRooms(data)
  })
}

const fetchDataStayRooms = () => {
  setIsLoading(true)
  fetch(url_stay_rooms)
  .then(response => {
    return response.json()
  })
  .then(data => {
    setIsLoading(false)
    setStayRooms(data)
  })
}


useEffect(() => {
  fetchDataRooms()
  fetchDataReservationRooms()
  fetchDataStayRooms()
}, [])

const getFormater = (dateStr) => {
  const date = new Date(dateStr)
  return  date.toLocaleDateString()//date.getDate() 
}
  ///////

    return (
        <div style={styles.container}>
            <ShowReservationTopBar toggleKey={toggleKey} setToggleKey={setToggleKey}/>

                <div style={styles.content}>
                  
                      <div>{renderHeader()}</div>
                      <div>{renderDays()}</div>
                      <div>{renderCells()}</div>
                </div> 
                
          </div>
                          /*
                            {isLoading
                                ? <LoadingOverlay laoding={isLoading} />
                                :  <tbody>
                                    <tr>
                                        <th>Nazwa</th>
                                        <th>Ilość osób</th>
                                      
                                    </tr>
                                    {rooms.map((rooms, id_room) => (
                                        <tr key={id_room}>
                                            <td>{rooms.name}</td>
                                            <td>{rooms.number_of_people}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                }

                                {isLoading
                                ? <LoadingOverlay loading={isLoading} />
                                : <tbody>
                                <tr>
                                        <th>  Data rezerwacji</th>
                                        <th>Nowy format daty</th>
                                        <th> Ilość osób</th>
                                        <th> Rezerwacja od</th>
                                        <th> Rezerwacja do</th>
                                      
                                    </tr>
                                    {reservation_rooms.map((reservation_rooms, id_stay) => (
                                        <tr key={id_stay}>
                                            <td>{reservation_rooms.reservation_date}</td>
                                            {getFormater(reservation_rooms.reservation_date)}
                                            <td>{reservation_rooms.number_of_people}</td>
                                            <td style={{backgroundColor: "blue"}}>{reservation_rooms.from_date}</td>
                                            <td>{reservation_rooms.to_date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                }

                                {isLoading 
                                ? <LoadingOverlay loading={isLoading}/>
                                : <tbody>
                                <tr>
                                        <th> Id rzerwacji </th>
                                        <th> Id pokoju</th>
                                      
                                    </tr>
                                    {stay_rooms.map((stay_rooms, id_stay) => (
                                        <tr key={id_stay}>
                                            <td>{stay_rooms.id_stay}</td>
                                            <td>{stay_rooms.id_room}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                }*/
    )
}

export default Calendar;