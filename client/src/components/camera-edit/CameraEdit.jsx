import { useEffect, useState } from "react";
import { useParams } from 'react-router'
import cameraService from "../../services/cameraService";

export default function CameraEdit(){

    const {cameraId} = useParams()

    console.log(cameraId);
    const [camera,setCamera] = useState({});


    useEffect(()=>{
        cameraService.getOne(cameraId)
        .then(setCamera)
    },[cameraId])

    const editHandler = async (formData) =>{
        const data = Object.fromEntries(formData);

        const result = await cameraService.editCamera(data,cameraId);

    
        console.log(result)
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

                <input type="submit" className="btn submit" value="Create" />

            </form>
        </div>
    )
}