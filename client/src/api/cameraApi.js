import { useEffect, useState } from "react"
import requester from "../utils/requester"
import useAuth from "../hooks/useAuth";


const baseUrl = 'http://localhost:3030/cameras';




export const useCreateCamera = () =>{
    
    const { request  } = useAuth()

    const create = (cameraData) =>{
        return request.post(`${baseUrl}/create`,cameraData);
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
};

export const useCamera = (cameraId) =>{
    const [camera,setCamera] = useState({});


    useEffect(()=>{
        requester.get(`${baseUrl}/${cameraId}`)
        .then(result=>{
            setCamera(result);
        })
    },[cameraId]);

    return{
        camera,
        setCamera
    }
};


export const useEditCamera = () =>{
    const { request } = useAuth();

    const edit = (cameraId, cameraData) => {
        request.put(`${baseUrl}/${cameraId}`, cameraData);
    };

    return {
        edit
    }

}

export const useDeleteCamera = () =>{
    const {request} = useAuth();

    const deleteCamera = (cameraId) =>{
        request.delete(`${baseUrl}/${cameraId}`)
    }

    return{
        deleteCamera
    }
};


export const useLikeCamera = ()=>{
    const {request} = useAuth();

    const likeCamera = (cameraId)=>{
        const result = request.post(`${baseUrl}/${cameraId}/like`);
        return result
    }

    return{
        likeCamera
    }
}