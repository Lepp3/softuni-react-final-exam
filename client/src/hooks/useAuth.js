import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import requester from "../utils/requester";



export default function useAuth(){
const authData = useContext(UserContext);

    const requestWrapper = (method, url,data,options = {}) => {
        const optionWrapper = {
            ...options,
            headers: {
                'authorization': authData.authToken,
                ...options.headers
            }
            
        }
        return requester.baseRequest(method, url,data,optionWrapper)
    }

    return{
        ...authData,
        request: {
            get: requestWrapper.bind(null,'GET'),
            post: requestWrapper.bind(null,'POST'),
            put: requestWrapper.bind(null,'PUT'),
            delete: requestWrapper.bind(null,'DELETE'),
       }
    }
}