import {Link} from 'react-router'

export default function Register(){
    return(
        <section>
            <form id="login">
            <h1>Register</h1>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />

            <label htmlFor="rePassword">Repeat password:</label>
            <input type="password" id="rePassword" name="rePassword" />

            <label htmlFor="imageUrl">Profile picture url:</label>
            <input type="text" id="imageUrl" name="imageUrl" />

            <label htmlFor="bio">Profile picture url:</label>
            <input type="text" id="bio" name="bio" />

            <input type="submit" className="btn submit" value="Register" />
            <div className="afterField">
                <span>Already have an account? Click <Link to="/login">here</Link></span>
            </div>
            </form>
        </section>
    )
}