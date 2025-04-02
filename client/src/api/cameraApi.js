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
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);
        requester.get(baseUrl)
        .then(result=>{
            setCameras(result);
        }).finally(setLoading(false))
    },[]);

    return {
        cameras,
        setCameras,
        loading
    }
};



export const useCamera = (cameraId) =>{
    const [camera,setCamera] = useState({});
    const [loading,setLoading] = useState(true);


    useEffect(()=>{
        setLoading(true);
        requester.get(`${baseUrl}/${cameraId}`)
        .then(result=>{
            setCamera(result);
        })
        .finally(()=>setLoading(false));
    },[cameraId]);

    return{
        camera,
        setCamera,
        loading
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

export const usePostComment = () =>{
    const { request } = useAuth();

    const postComment = (cameraId,commentData) =>{
        const result = request.post(`${baseUrl}/${cameraId}/comments`, commentData);
        return result
    }

    return {
        postComment
    }
}

export const useDeleteCamera = () =>{
    const {request} = useAuth();

    const deleteCamera = (cameraId) =>{
        const result = request.delete(`${baseUrl}/${cameraId}`);
        return result;
    }

    return{
        deleteCamera
    }
};

export const useDeleteComment = () =>{
    const {request} = useAuth();

    const deleteComment = (cameraId,commentId) =>{
       const result =  request.delete(`${baseUrl}/${cameraId}/comments/${commentId}`);
       return result
    }

    return{
        deleteComment
    }
}


export const useLikeCamera = ()=>{
    const {request} = useAuth();

    const likeCamera = (cameraId)=>{
        const result = request.post(`${baseUrl}/${cameraId}/like`);
        return result
    }

    return{
        likeCamera
    }
};

export const useRemoveLiked = ()=>{
    const {request} = useAuth();

    const unlikeCamera = (cameraId)=>{
        const result = request.delete(`${baseUrl}/${cameraId}/like`);
        return result
    }

    return{
        unlikeCamera
    }
}