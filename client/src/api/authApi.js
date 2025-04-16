import { useContext, useEffect, useRef,useState } from "react"
import requester from "../utils/requester"
import { UserContext } from "../contexts/UserContext";
import useAuth from "../hooks/useAuth";


const baseUrl = 'http://localhost:3030/users';

export const useRefreshToken = () =>{
    const abortRef = useRef();

    const refreshTokenFn = async (expiredToken, refreshToken) =>{
        const validJwt = await requester.post(
                        `${baseUrl}/refresh-token`, 
                         {refreshToken,expiredToken},
                         {signal: abortRef.current.signal});

        return validJwt;
    }

    useEffect(()=>{
        const abortController = new AbortController();

        abortRef.current = abortController;

        return ()=>abortController.abort();
    },[]);

    return {
        refreshTokenFn
    }
}

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
    const { authToken,refreshToken,userLogoutHandler } = useContext(UserContext);
    const effectRan = useRef();

    useEffect(()=>{

        if(!authToken || effectRan.current){
            return;
        }

        console.log(refreshToken);

        effectRan.current = true;
        const options = {
            headers: {
                'authorization': authToken,
                'refreshtoken': refreshToken,
            }
        };
        requester.get(`${baseUrl}/logout`,null,options)
        .then(()=>userLogoutHandler());

    },[authToken,refreshToken,userLogoutHandler])
   
    return {
        isLoggedOut: !!authToken
    }
    
}

export const useGetUser = (userId) =>{
    const [user,setUser] = useState({});
    const [loading,setLoading] = useState(true);
    if(!userId){
        return
    }
    

    useEffect(()=>{
        setLoading(true)
        requester.get(`${baseUrl}/${userId}`)
        .then(result=>{
            setUser(result);
        })
        .finally(()=>setLoading(false))

        
    },[userId]);

    return{
        user,
        loading
    }

    
};

export const useEditUser = () =>{
    const { request } = useAuth()

    const editUserProfile = (userId, userData) => {
        const result = request.put(`${baseUrl}/${userId}`, userData);
        return result
    };

    return {
        editUserProfile
    }

}