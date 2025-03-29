import { useContext } from "react"
import { Link } from "react-router"
import { UserContext } from "../../contexts/UserContext"

export default function Header(){
    //TODO AUTHENTICATION FOR DYNAMIC RENDER OF BUTTONS

    const { email, userId} = useContext(UserContext);
    return(
        <header>
            <h1><Link to="/">CameraWorld</Link></h1>
            <nav>
            <Link to="/">Home</Link>
            <Link to="/cameras">Cameras</Link>
            <Link to="/about">About</Link>
            {email ?
             <div id="user">
             <Link to="/cameras/create">Post a camera</Link>
             <Link to="/logout">Logout</Link>
             <Link to={`/user/${userId}`}>{email}'s Profile</Link>
             </div>
            : <div id="guest">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </div>
            }
            </nav>
        </header>
    )
}