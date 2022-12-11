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
import { areDatesTheSame, getDateObject, getDaysInMonth, getSortedDays, range } from "./utils";



const labels = {
    'stay': {
        name: 'Nazwa',
        number_of_people: 'Liczba osób',
    },
    'conference': {
        name: 'Nazwa',
        number_of_people: 'Liczba osób',
    }
}

const Calendar = ({ workerId, startingDate, eventsArr}) => {

    const [toggleKey, setToggleKey] = useState('stay');
    const [loading, setLoading] = useState(true);

    const [stayItems, setStayItems] = useState([]);
    const [conferenceItems, setConferenceItems] = useState([]);
    const [clients, setClients] = useState([]);
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);

    const [currentMonth, setCurrentMonth] = useState(startingDate.getMonth())
    const [currentYear, setCurrentYear] = useState(startingDate.getFullYear())
    const DAYSINMONTHS = getDaysInMonth(currentMonth, currentYear)

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


    return (
        <div style={styles.container}>
            <ShowReservationTopBar toggleKey={toggleKey} setToggleKey={setToggleKey}/>

                <div style={styles.content}>
                    <div style={styles.calendarHead}>
                            <IoIosArrowDropleftCircle onClick={prevMonth}/>
                                {MONTHS[currentMonth]} {currentYear}
                            <IoIosArrowDroprightCircle onClick={nextMonth}/>   
                    </div>

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

                        <div styles={styles.topRightReservation}>   
                            <div style={styles.sevenColGrid}>
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
                            </div>
                        </div>
                    </div>
                     
                </div>
        </div>
    )
}

export default Calendar;