import React, { useEffect, useState } from "react"
import { getEvents, joinEvent, leaveEvent } from "../../managers/EventManager.js"
import { useNavigate } from 'react-router-dom'


export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()
    
    const loadEvents = () => {
        getEvents().then(data => setEvents(data))
    }

    useEffect(() => {
        loadEvents()
    }, [])

    return (
        <>
        <header>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
            >Register New Event</button>
        </header>
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">Event Name: {event.description}</div>
                        <div className="event__game">Game: {event.game.title}</div>
                        <div className="event__date">Event Date: {event.date}</div>
                        <div className="event__time">Event Time; {event.time}</div>

                        {
                        event.joined ?
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                leaveEvent(event.id)
                                    .then(() => loadEvents())
                                }}
                                >Leave Event</button>
                                :
                                <button className="btn btn-2 btn-sep icon-create"
                                onClick={() => {
                                    joinEvent(event.id)
                                        .then(() => loadEvents())
                                }}
                        >Join Event</button>
                        }
                    </section>
                })
            }
        </article>
        </>
    )
}