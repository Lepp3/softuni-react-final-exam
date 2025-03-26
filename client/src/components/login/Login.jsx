import {Link} from 'react-router'

export default function Login(){
    return(
        <section>
            <form id="login">
            <h1>Login</h1>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="youremail@domain.com" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />

            <input type="submit" className="btn submit" value="Login" />
            <div className="afterField">
                <span>If you don't have a profile click <Link to="/register">here</Link></span>
            </div>
            </form>
        </section>
    )
}