import { useParams, useNavigate, Navigate } from 'react-router'
import { useCamera, useEditCamera } from "../../api/cameraApi";
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

export default function CameraEdit(){

    const {cameraId} = useParams();

    const navigate = useNavigate();

    const { camera, loading} = useCamera(cameraId);

    const { edit } = useEditCamera();

    const { userId } = useContext(UserContext);

    const [error,setError] = useState(null);

    if(loading){
        return <p>Loading camera information</p>
    }

    if(camera.ownerId !== userId){
        
        return <Navigate to="/cameras" replace/>
    }
    
   

    const editHandler = async (formData) =>{
        const data = Object.fromEntries(formData);

        try{
            await edit(cameraId,data);
            navigate(`/cameras/${cameraId}/details`);
        }catch(err){
            setError(err.message);
            setTimeout(() => {
                setError(null)
            }, 3000);
        }

        
    }

    return(
        <div>
            <form action={editHandler}>
                <h1>Post a camera</h1>

                <label htmlFor="make">Make:</label>
                <input type="text" id="make" name="make" defaultValue={camera.make}/>

                <label htmlFor="model">Model:</label>
                <input type="text" id="model" name="model" defaultValue={camera.model} />

                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price"  defaultValue={camera.price} />

                <label htmlFor="year">Year:</label>
                <input type="number" id="year" name="year" defaultValue={camera.year} />

                <label htmlFor="resolution">Resolution:</label>
                <input type="text" id="resolution" name="resolution" defaultValue={camera.resolution} />

                <label htmlFor="imageUrl">Image Url:</label>
                <input type="text" id="imageUrl" name="imageUrl" defaultValue={camera.imageUrl} />

                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" defaultValue={camera.description} />

                <input type="submit" className="btn submit" value="Edit" />
                {error? <p>{error}</p> : <></>}

            </form>
        </div>
    )
}