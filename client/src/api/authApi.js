import { useContext, useEffect, useRef } from "react"
import requester from "../utils/requester"
import { UserContext } from "../contexts/UserContext";


const baseUrl = 'http://localhost:3030/users'

export const useLogin = () =>{

    const abortRef = useRef();

    const login = async (email,password)=>{
        const authData = await requester.post(
            `${baseUrl}/login`,
            {email,password}, 
            {signal: abortRef.current.signal}
        );

        return authData
    };

    useEffect(()=>{
        const abortController = new AbortController();

        abortRef.current = abortController;

        return ()=>abortController.abort();
    },[]);



    return{
        login
    }
};


export const useRegister = () =>{
    const abortRef = useRef();

    const register = async (userData) =>{
        const authData = await requester.post(
            `${baseUrl}/register`,
            userData,
            {signal:abortRef.current.signal});

            return authData
    }

    useEffect(()=>{
        const abortController = new AbortController();

        abortRef.current = abortController;

        return ()=>abortController.abort();
    },[])

    return{
        register
    }
};


export const useLogout = () =>{
    const { authToken,userLogoutHandler } = useContext(UserContext);
    const effectRan = useRef();

    useEffect(()=>{

        if(!authToken || effectRan.current){
            return;
        }

        effectRan.current = true;
        const options = {
            headers: {
                'authorization': authToken
            }
        };
        requester.get(`${baseUrl}/logout`,null,options)
        .then(()=>userLogoutHandler());

    },[authToken,userLogoutHandler])
   
    return {
        isLoggedOut: !!authToken
    }
    
}