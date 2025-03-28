import {Link, useNavigate} from 'react-router'
import {useActionState} from 'react'

import { useLogin } from '../../api/authApi';

export default function Login({onLogin}){

    const { login } = useLogin();
    const navigate = useNavigate();

    const loginHandler = async (_, formData) =>{
        const data = Object.fromEntries(formData);

       const result = await login(data.email,data.password);

       onLogin(result);

        navigate('/');
        
        return data
    };

    const [_,loginAction,isPending] = useActionState(loginHandler, {emai:'', password: ''});

    
    return(
        <section>
            <form id="login" action={loginAction}>
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