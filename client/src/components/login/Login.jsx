import {Link, useNavigate} from 'react-router'
import {useActionState, useContext, useState} from 'react'

import { useLogin } from '../../api/authApi';
import { UserContext } from '../../contexts/UserContext';

export default function Login(){

    const { login } = useLogin();
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);

    const [error,setError] = useState(null);
    const [touched,setTouched] = useState({});
    const [form,setForm] = useState({email:'',password: ''});

    const handleTouch = (e) =>{
        setTouched({...touched,[e.target.name]:true});
    };

   const isFormFilled = () =>{
    return(Object.keys(touched).length === Object.keys(form).length);
   }

    const loginHandler = async (formData) =>{
        const data = Object.fromEntries(formData);

        try{
            const result = await login(data.email,data.password);

            userLoginHandler(result);

            navigate('/');
        
        return data
        }catch(err){
            setError(err.message);
            setTimeout(() => setError(null), 3000);
        }

       
    };

    

    
    return(
        <section>
            <form id="login" action={loginHandler}>
            <h1>Login</h1>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="youremail@domain.com" onBlur={handleTouch}/>

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" onBlur={handleTouch}/>

            <input type="submit" className="btn submit" value="Login"  disabled={!isFormFilled()}/>
            <div className="afterField">
                <span>If you don't have a profile click <Link to="/register">here</Link></span>
            </div>
            </form>
            {error ? <div id="errorSection">{error}</div> : <></>}
        </section>
    )
}