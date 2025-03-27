import { useEffect, useState } from 'react'
import {useParams, Link, useNavigate} from 'react-router'
import cameraService from '../../services/cameraService';


export default function CameraDetails(){
    const {cameraId} = useParams()
    const navigate = useNavigate();
    const [camera,setCamera] = useState({});

    useEffect(()=>{
        cameraService.getOne(cameraId)
        .then(setCamera)
    },[cameraId]);


    const cameraDeleteHandler = async () =>{
        const choice = confirm('Are you sure you want to delete this camera?');
        if(!choice){
            return
        }

        await cameraService.deleteCamera(cameraId);
        navigate('/cameras');

    }

    return(
       <section>
        <div>
            <h1>{camera.make}</h1>
            <h2>{camera.model}</h2>
            <img src={camera.imageUrl} alt='Camera Image'/>
            <p>Price: {camera.price} $</p>
            <p>Created in: {camera.year}</p>
            <p>Resolution: {camera.resolution}</p>
            <div>
                <h3>Description</h3>
                <p>{camera.description}</p>
            </div>
            <div className='buttons'>
                <div className='btn'> <Link to={`/cameras/${cameraId}/edit`}>Edit</Link></div>
                <div className='btn'
                    onClick={cameraDeleteHandler}
                > 
                Delete
                </div>
            </div>
        </div>
       </section>
    )
}