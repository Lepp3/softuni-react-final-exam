import { useState } from "react";
import { useCreateCamera } from "../../api/cameraApi";

import {useNavigate} from 'react-router';

export default function CameraCreate(){

    const navigate = useNavigate();
    const { create } = useCreateCamera();
    const [error,setError] = useState(null)
 
    const createHandler = async (formData) =>{
        const {make,model,price,year,resolution,imageUrl,description} = Object.fromEntries(formData);

        let isValid = make && model && price && year && resolution && imageUrl && description;

        if(!isValid){
            
            setError('All fields are required!');
            setTimeout(() => setError(null), 3000);
            return;
        }

        try{

            await create({make,model,price,year,resolution,imageUrl,description});

            navigate('/cameras');
        }catch(err){
            setError(err.message);
            setTimeout(() => setError(null), 3000);
        }

        
    }

    return(
        <div>
            <form action={createHandler}>
                <h1>Post a camera</h1>

                <label htmlFor="make">Make:</label>
                <input type="text" id="make" name="make" />

                <label htmlFor="model">Model:</label>
                <input type="text" id="model" name="model" />

                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" />

                <label htmlFor="year">Year:</label>
                <input type="number" id="year" name="year" />

                <label htmlFor="resolution">Resolution:</label>
                <input type="text" id="resolution" name="resolution" />

                <label htmlFor="imageUrl">Image Url:</label>
                <input type="text" id="imageUrl" name="imageUrl" />

                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" />

                <input type="submit" className="btn submit" value="Create" />

            </form>
            {error ? <div id="errorSection">{error}</div> : <></>} 
        </div>
    )
}