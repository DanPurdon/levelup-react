import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent } from "../../managers/EventManager.js"
import { getGames } from "../../managers/GameManager.js"


export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    const [currentEvent, setCurrentEvent] = useState({
        game: 1,
        description: "",
        date: "",
        time: ""
    })

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const changeEventState = (property, value) => {
        const copy = { ...currentEvent }
        copy[property] = value
        setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Event Title: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={
                            (evt) => {
                                changeEventState("description", evt.target.value)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="games">
                        Game: 
                        <select value={currentEvent.gameId} onChange={(event) => {
                            changeEventState("game", event.target.value)
                            }}>
                            {
                                games?.map(
                                    (game) => {
                                        return <>
                                            <option value={game.id}>{game.title}</option>
                                            </>
                                    }
                                )
                            }    
                        </select>
                    </label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={
                            (evt) => {
                                changeEventState("date", evt.target.value)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Event Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={
                            (evt) => {
                                changeEventState("time", evt.target.value)
                            }
                        }
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        game: parseInt(currentEvent.game),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}