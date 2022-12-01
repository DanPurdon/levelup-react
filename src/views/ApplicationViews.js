import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { EventList } from "../components/event/EventList"
import { EventForm } from "../components/event/EventForm"
import { UpdateEvent } from "../components/event/UpdateEvent"
import { EventDetails } from "../components/event/EventDetails"
import { GameList } from "../components/game/GameList"
import { GameForm } from "../components/game/GameForm"
import { UpdateGame } from "../components/game/UpdateGame"
import { GameDetails } from "../components/game/GameDetails"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="events" element={<EventList />} />
                <Route path="events/new" element={<EventForm />} />
                <Route path="events/:eventId/edit" element={ <UpdateEvent /> } />
                <Route path="events/:eventId" element={<EventDetails/>} />
                <Route path="games" element={<GameList />} />
                <Route path="games/new" element={<GameForm />} />
                <Route path="games/:gameId/edit" element={ <UpdateGame /> } />
                <Route path="games/:gameId" element={<GameDetails/>} />
            </Route>
        </Routes>
    </>
}