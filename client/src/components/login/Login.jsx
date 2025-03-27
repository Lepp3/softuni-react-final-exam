import {Link} from 'react-router'
import authService from '../../services/authService';

export default function Login(){

    const loginHandler = async (formData) =>{
        const data = Object.fromEntries(formData);

        const result = await authService.login(data);

        console.log(result);
    }
    return(
        <section>
            <form id="login" action={loginHandler}>
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