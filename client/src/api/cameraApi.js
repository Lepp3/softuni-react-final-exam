import { useContext, useEffect, useState } from "react"
import requester from "../utils/requester"
import { UserContext } from "../contexts/UserContext"

const baseUrl = 'http://localhost:3030/cameras'

export const useCreateCamera = () =>{
    const { authToken} = useContext(UserContext)
    const options = {
        headers: {
            'authorization': authToken
        }
    };

    const create = (cameraData) =>{
        return requester.post(`${baseUrl}/create`,cameraData,options);
    }

    return {
        create
    }
};



export const useCameras = () =>{
    const [cameras,setCameras] = useState([]);

    useEffect(()=>{
        requester.get(baseUrl)
        .then(result=>{
            setCameras(result);
        })
    },[]);

    return {
        cameras
    }
}