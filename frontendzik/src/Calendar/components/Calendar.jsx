import commonStyles from "../../styles/commonStyles";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from '../styles/calendarStyles';
import { useState } from "react";
import { v4 as uuid } from "uuid";


const event = [
    {
        id: 1,
        status: 'room',
        title: 'room 1',
        start: '2022-11-14',
        end: '2022-11-18',
    },
    {
        id: 2,
        status: 'room',
        title: 'room 2',
        start: '2022-11-07',
        end: '2022-11-09',
    },
    {
        id: 3,
        status: 'conference',
        title: 'confernece 1',
        start: '2022-11-07',
        end: '2022-11-12',
    },

];


const Calendar = () => {
    /*
    const[events, setEvents] = useState([]);

    const handleSelect = (info) => {
        const {start, end} = info;
        const eventNamePrompt = prompt('Enter, event name');
        if(eventNamePrompt) {
            setEvents([
                ...events,
                {
                    start,
                    end,
                    title: eventNamePrompt,
                    id: uuid(),
                },
            ]);
        }
    };

    const EventItem = () => {
        const { event } = info;
        return(
            <div>
                <p>{event.title}</p>
            </div>
        );
    };*/

    return(
        <div style={styles.calendar}>
            <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView = 'dayGridMonth'
           
            headerToolbar={{
                start:'today prev',
                center: 'title',
                end: 'next',
            }}

            customButtons={{
                new: {
                  text: 'new',
                  click: () => console.log('new event'),
                },
              }}

            //aspectRatio={5}
            height={500}
            events={event}

            eventColor='orange'
           

           nowIndicator
           dateClick={(e) => console.log(e.dateStr)}
           eventClick={(e) => console.log(e.event.id)}

            />
        </div>
    );
}
export default Calendar;