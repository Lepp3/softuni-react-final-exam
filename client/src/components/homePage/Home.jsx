import { Link } from "react-router"
import useAuth from "../../hooks/useAuth"

export default function Home(){

    const {isAuthenticated} = useAuth()
    
    return(
        <section>
            <h1>Welcome to Camera World!</h1>
            <div id="actionButtons">
                {isAuthenticated ? <Link to="/cameras/create"> Post a camera!</Link> : <Link to="/login"> Log in to start posting!</Link>}
            </div>
        </section>
    )
}