import {Link} from 'react-router'
import {useActionState} from 'react'
import authService from '../../services/authService';
import { useLogin } from '../../api/authApi';

export default function Login(){

    const { login } = useLogin();

    const loginHandler = async (previousState, formData) =>{
        const data = Object.fromEntries(formData);

       const result = await login(data.email,data.password);

        // const result = await authService.login(data);

        console.log(result);

        return data
    };

    const [values,loginAction,isPending] = useActionState(loginHandler, {emai:'', password: ''});

    
    return(
        <section>
            <form id="login" action={loginAction}>
            <h1>Login</h1>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="youremail@domain.com" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />

            <input type="submit" className="btn submit" value="Login" disabled={isPending}/>
            <div className="afterField">
                <span>If you don't have a profile click <Link to="/register">here</Link></span>
            </div>
            </form>
        </section>
    )
}