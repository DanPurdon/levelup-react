import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getGame, deleteGame } from "../../managers/GameManager"


export const GameDetails = () => {
    const {gameId} = useParams()
    const [game, updateGame] = useState()
    
    useEffect(
        () => {
            getGame(gameId)
                .then((data) => {updateGame(data)})
        },
        [gameId]
    )

    const navigate = useNavigate()

    return <section className="game">
            <header>{game?.title}</header>
            <div>{game?.game_type.label}</div>
            <div>{game?.maker}</div>
            <div>Number of Players: {game?.number_of_players}</div>
            <div>Skill Level: {game?.skill_level}</div>
            
            <button 
                onClick={() => {
                    
                    navigate(`/games/${game.id}/edit`)
                }}
            className="button-55">
                Edit game
            </button>
            <button 
                onClick={() => {
                    deleteGame(game.id)
                    .then(window.alert("Game Deleted"))
                    .then(navigate(`/games`))
                }}
            className="button-55">
                DELETE game
            </button>
        </section>
}