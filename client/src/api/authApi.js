import requester from "../utils/requester"


const baseUrl = 'http://localhost:3030/users'

export const useLogin = () =>{

    const login = async (email,password)=>{
        const authData = await requester.post(`${baseUrl}/login`,{email,password});

        return authData
    }

    return{
        login
    }
}