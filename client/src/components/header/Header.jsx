import { Link } from "react-router"

export default function Header(){
    //TODO AUTHENTICATION FOR DYNAMIC RENDER OF BUTTONS
    return(
        <header>
            <h1><Link>CameraWorld</Link></h1>
            <nav>
            <Link>Home</Link>
            <Link>Cameras</Link>
            <Link>About</Link>
            <div id="guest">
            <Link>Login</Link>
            <Link>Register</Link>
            </div>
            <div id="user">
            <Link>Post a camera</Link>
            <Link>Logout</Link>
            <Link>Profile Page</Link>
            </div>
            </nav>
        </header>
    )
}