import {Link} from 'react-router'
import authService from '../../services/authService';

export default function Register(){

    const submitAction = async (formData) =>{
        const data = Object.fromEntries(formData);
        
        if(data.password !== data.rePassword){
            return;
        }

        const email = data.email;
        const username = data.username;
        const password = data.password;

        const result = await authService.register({email,username,password});

        console.log(result);
        
    }

    return(
        <section>
            <form id="login" action={submitAction}>
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
        </section>
    )
}