import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { updateGame, getGameTypes, getGame } from '../../managers/GameManager.js'


export const UpdateGame = () => {
    const {gameId} = useParams()
    const navigate = useNavigate()
    const [currentGame, setCurrentGame] = useState()
    const [gameTypes, setGameTypes] = useState([])

    
    useEffect(
        () => {
            getGame(gameId)
                .then((data) => {setCurrentGame(data)})
        },
        [gameId]
    )

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    const changeGameState = (property, value) => {
        const copy = { ...currentGame }
        copy[property] = value
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game Info</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame?.title}
                        onChange={
                            (evt) => {
                                changeGameState("title", evt.target.value)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame?.maker}
                        onChange={
                            (evt) => {
                                changeGameState("maker", evt.target.value)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame?.number_of_players}
                        onChange={
                            (evt) => {
                                changeGameState("number_of_players", evt.target.value)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame?.skill_level}
                        onChange={
                            (evt) => {
                                changeGameState("skill_level", evt.target.value)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="gameTypes">
                        Game Type: 
                        <select value={currentGame?.game_type.id} onChange={(event) => {
                            changeGameState("game_type", event.target.value)
                            }}>
                            {
                                gameTypes?.map(
                                    (gameType) => {
                                        return <>
                                            <option value={gameType.id}>{gameType.label}</option>
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
                    let gameType = currentGame.game_type
                    typeof gameType === 'string' ? gameType = parseInt(gameType) : gameType = gameType.id

                    const game = {
                        id: currentGame.id,
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: gameType
                    }

                    // Send POST request to your API
                    updateGame(game)
                        .then(() => navigate(`/games/${gameId}`))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}