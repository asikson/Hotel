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



const labels = {
    'stay': {
        name: 'Nazwa',
        number_of_people: 'Liczba osób',
    },
    'conference': {
        name: 'Nazwa',
        number_of_people: 'Liczba osób',
    },
}

const Calendar = ({ workerId, startingDate, eventsArr}) => {

    const [toggleKey, setToggleKey] = useState('stay');
    const [loading, setLoading] = useState(true);
    

    const [stayItems, setStayItems] = useState([]);
    const [conferenceItems, setConferenceItems] = useState([]);
    const [clients, setClients] = useState([]);
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);

    //const [currentMonth, setCurrentMonth] = useState(startingDate.getMonth())
    //const [currentYear, setCurrentYear] = useState(startingDate.getFullYear())
    //const DAYSINMONTHS = getDaysInMonth(currentMonth, currentYear)


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
            setStayItems(response);
            setLoading(false);
        });
        getItems(`rooms/conferencerooms/`).then(response => {
            setConferenceItems(response);
            setLoading(false);
        });
    };

    const nextMonth = () => {
        if(currentMonth < 11){
            setCurrentMonth((prev) => prev + 1)
        } 
        else {
            setCurrentMonth(0)
            setCurrentYear((prev) => prev + 1)
        }
    };
    
    const prevMonth = () => {
        if(currentMonth > 0){
            setCurrentMonth((prev) => prev - 1)
        } 
        else {
            setCurrentMonth(11)
            setCurrentYear((prev) => prev - 1)
        }
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
      }

      rows.push(
        <div className="row" key={day} style={styles.styledDay}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body" >
        {rows}
       
        <div style={{border: '2px solid'}}>
        <CalendarListTable 
            items={items} 
            labels={labels[toggleKey]}
                /></div>
        
   </div>
  };

  ///////  

    return (
        <div style={styles.container}>
            <ShowReservationTopBar toggleKey={toggleKey} setToggleKey={setToggleKey}/>

                <div style={styles.content}>
                    {/*<div style={styles.calendarHead}>
                            <IoIosArrowDropleftCircle onClick={prevMonth}/>
                                {MONTHS[currentMonth]} {currentYear}
                            <IoIosArrowDroprightCircle onClick={nextMonth}/>   
                    </div>*/}

                <div style={styles.topBarReservation}>
                        <div style={styles.topLeftReservation}>
                            {loading
                                ? <LoadingOverlay laoding={loading} />
                                : <ShowListTable 
                                items={items} 
                                labels={labels[toggleKey]} 
                                admin={true} 
                                />
                                }
                        </div>     

                        <div style={styles.topRightReservation}>   
                           {/*} <div style={styles.sevenColGrid}>
                                {DAYS.map((day) => <div style={styles.headDay}>{day}</div>)}
                            </div>
                            <div style={styles.calendarBody}>
                            {range(DAYSINMONTHS).map((day) => (
                                    <div style={styles.styledDay}>
                                        {day}
                                    </div>
                                 ))}
                                </div>
                                {getSortedDays(currentMonth, currentYear).map((day) => (
                                    <div style={styles.headDay}>{day}</div>
                                ))}
                                
                            </div>
                            <div style={styles.calendarBody} fourCol={DAYSINMONTHS == 28}>
                                {range(DAYSINMONTHS).map((day) => (
                                    <div style={styles.styledDay} active={areDatesTheSame(new Date(), getDateObject(day, currentMonth, currentYear))}>
                                        {day}
                                        {
                                        eventsArr.map((ev) => (
                                           //areDatesTheSame(getDateObject(day, currentMonth, currentYear), ev.date) &&
                                           <div style={styles.styledEvent}>{ev.title}</div>
                                            ))
                                        }
                                    </div>
                                 ))}
                            </div>*/}

                                <div>
                                {renderHeader()}
                                {renderDays()}
                                {renderCells()}</div> 
                        </div> 
                    </div>
                     
                </div>
        </div>
    )
}

export default Calendar;