import { useEffect, useRef } from "react"
import requester from "../utils/requester"


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
}