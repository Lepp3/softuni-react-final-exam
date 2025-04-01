import {Link, useNavigate} from 'react-router'

import { useContext, useState } from 'react';
import { useRegister } from '../../api/authApi';
import { UserContext } from '../../contexts/UserContext';

export default function Register(){

    const [error,setError] = useState(null);
    const { register } = useRegister();
    const { userLoginHandler } = useContext(UserContext);
    const navigate  = useNavigate();
    const [form,setForm] = useState({
        email:'',
        username: '',
        password: '',
        rePassword: ''});

    const [touched,setTouched] = useState({});

    const handleChange = (e)=>{
        
        setForm({...form,[e.target.name]: e.target.value});
    }

    const handleTouch = (e) =>{
        
        setTouched({...touched,[e.target.name]: true});
    }


    const validateEmail = (email) =>{
        const emailPattern = /^[A-z0-9]+@[a-z]{3,7}\.[a-z]{2,5}$/;
        return emailPattern.test(email);
    };

    const validateUsername = (username) => username.length >= 4 && username.length <= 15;

    const validatePassword = (password) => password.length >= 4;

    const validatePasswords = (password,rePassword) => password === rePassword;

    const isFormValid = () =>{
        return (
            validateEmail(form.email) && 
            validateUsername(form.username) &&
            validatePassword(form.password) &&
            validatePasswords(form.password,form.rePassword) &&
            Object.keys(touched).length === Object.keys(form).length
        )
    }

    const registerHandler = async (formData) =>{
        const {email,username,password,rePassword} = Object.fromEntries(formData);
        
       

        
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
            <input type="email" id="email" name="email" value={form.email} className={touched.username && !validateEmail(form.email) ? 'invalid' : ''} onChange={handleChange} onBlur={handleTouch}/>
            {(touched.email && !validateEmail(form.email)) && <p>Invalid email format</p>}

            <label htmlFor="username">Username:</label>
            <input type="username" id="username" name="username" className={touched.username && !validateUsername(form.username) ? 'invalid' : ''} value={form.username} onChange={handleChange} onBlur={handleTouch}/>
            {touched.username && !validateUsername(form.username) && <p>Username should be between 4 and 15 characters!</p>}

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password"  value={form.password} onChange={handleChange} onBlur={handleTouch} className={touched.password && !validatePassword(form.password) ? 'invalid' : ''}/>
            {touched.password && !validatePassword(form.password) && <p>Password should be atleast 4 characters!</p>}

            <label htmlFor="rePassword">Repeat password:</label>
            <input type="password" id="rePassword" name="rePassword" value={form.rePassword} onChange={handleChange} onBlur={handleTouch} className={touched.rePassword && !validatePasswords(form.password,form.rePassword) ? 'invalid' : ''}/>
            {touched.rePassword && !validatePasswords(form.password,form.rePassword) && <p>Passwords don't match!</p>}
            

            <input type="submit" className="btn submit" value="Register" disabled={!isFormValid()}/>
            <div className="afterField">
                <span>Already have an account? Click <Link to="/login">here</Link></span>
            </div>
            </form>
            {error ? <div id="errorSection">{error}</div> : <></>}  
        </section>
    )
}