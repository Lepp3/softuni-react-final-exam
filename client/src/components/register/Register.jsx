import {Link, useNavigate} from 'react-router'

import { useContext, useState } from 'react';
import { useRegister } from '../../api/authApi';
import { UserContext } from '../../contexts/UserContext';

export default function Register(){

    const [error,setError] = useState(null);
    const { register } = useRegister();
    const { userLoginHandler } = useContext(UserContext);
    const navigate  = useNavigate()

    const registerHandler = async (formData) =>{
        const {email,username,password,rePassword} = Object.fromEntries(formData);
        
        if(password !== rePassword){
            setError('Password mismatch!');
            setTimeout(() => setError(null), 3000);
            return;
        }

        
        try{
            const result = await register({email,username,password});
            userLoginHandler(result);
            navigate('/');
        }catch(err){
            setError(err.message);
            setTimeout(() => setError(null), 3000);
        }
        

        
        
    }

    return(
        <section>
            <form id="login" action={registerHandler}>
            <h1>Register</h1>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />

            <label htmlFor="username">Username:</label>
            <input type="username" id="username" name="username" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />

            <label htmlFor="rePassword">Repeat password:</label>
            <input type="password" id="rePassword" name="rePassword" />

            

            <input type="submit" className="btn submit" value="Register" />
            <div className="afterField">
                <span>Already have an account? Click <Link to="/login">here</Link></span>
            </div>
            </form>
            {error ? <div id="errorSection">{error}</div> : <></>}  
        </section>
    )
}