import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { updateEvent, getEvent } from '../../managers/EventManager.js'
import { getGames } from "../../managers/GameManager.js"


export const UpdateEvent = () => {
    const {eventId} = useParams()
    const navigate = useNavigate()
    const [currentEvent, setCurrentEvent] = useState()
    const [games, setGames] = useState([])

    
    useEffect(
        () => {
            getEvent(eventId)
                .then((data) => {setCurrentEvent(data)})
        },
        [eventId]
    )

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
            <h2 className="eventForm__description">Update Event Info</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent?.description}
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
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent?.date}
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
                    <label htmlFor="time">Number of Players: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent?.time}
                        onChange={
                            (evt) => {
                                changeEventState("time", evt.target.value)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="games">
                        Game: 
                        <select value={currentEvent?.game.id} onChange={(event) => {
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

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    let game = currentEvent.game
                    typeof game === 'string' ? game = parseInt(game) : game = game.id

                    const event = {
                        id: currentEvent.id,
                        game: game,
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        organizer: currentEvent.organizer.id
                    }

                    // Send POST request to your API
                    updateEvent(event)
                        .then(() => navigate(`/events/${eventId}`))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}