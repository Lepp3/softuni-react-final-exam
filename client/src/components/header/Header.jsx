import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import styles from './Header.module.css';

export default function Header(){
    //TODO AUTHENTICATION FOR DYNAMIC RENDER OF BUTTONS

    const { username, userId} = useContext(UserContext);
    return(
        <header className={styles.header}>
            <h1><Link to="/">Camera World</Link></h1>
            <nav className={styles.nav}>
            <Link to="/">Home</Link>
            <Link to="/cameras">Cameras</Link>
            <Link to="/about">About</Link>
            {username ?
             <div id="user">
             <Link to="/cameras/create">Post a camera</Link>
             <Link to="/logout">Logout</Link>
             <Link to={`/user/${userId}`}>{username}'s Profile</Link>
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