import { Link } from "react-router"

export default function Header(){
    //TODO AUTHENTICATION FOR DYNAMIC RENDER OF BUTTONS
    return(
        <header>
            <h1><Link to="/">CameraWorld</Link></h1>
            <nav>
            <Link to="/">Home</Link>
            <Link to="/cameras">Cameras</Link>
            <Link to="/about">About</Link>
            <div id="guest">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </div>
            <div id="user">
            <Link to="/cameras/create">Post a camera</Link>
            <Link to="/logout">Logout</Link>
            <Link to="/user/userId">Profile Page</Link>
            </div>
            </nav>
        </header>
    )
}