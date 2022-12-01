import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getEvent, deleteEvent } from "../../managers/EventManager"


export const EventDetails = () => {
    const {eventId} = useParams()
    const [event, updateEvent] = useState()
    
    useEffect(
        () => {
            getEvent(eventId)
                .then((data) => {updateEvent(data)})
        },
        [eventId]
    )

    const navigate = useNavigate()

    return <section className="event">
            <header>{event?.description}</header>
            <div>Game: {event?.game.title}</div>
            <div>Date: {event?.date}</div>
            <div>Time: {event?.time}</div>
            
            <button 
                onClick={() => {
                    
                    navigate(`/events/${event.id}/edit`)
                }}
            className="button-55">
                Edit event
            </button>
            <button 
                onClick={() => {
                    deleteEvent(event.id)
                    .then(window.alert("Event Deleted"))
                    .then(navigate(`/events`))
                }}
            className="button-55">
                DELETE event
            </button>
        </section>
}