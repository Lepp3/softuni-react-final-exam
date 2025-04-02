import { Link } from "react-router"
import useAuth from "../../hooks/useAuth"
import styles from "./Home.module.css";

export default function Home(){

    const {isAuthenticated} = useAuth()
    
    return(
        <section className={styles.homeSection}>
            <div id="headingHolder">
            <h2>Welcome to Camera World!</h2>
            <h3>The perfect place for a camera enthusiast</h3>
            </div>
            <div className={styles.actionButtons}>
                {isAuthenticated ? <h4>Got a cool camera to share? <Link to="/cameras/create"> Post it!</Link></h4>: <h4><Link to="/login"> Log in</Link> to start posting!</h4>}
            </div>
        </section>
    )
}