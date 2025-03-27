import { useEffect, useState } from 'react'
import {Link} from 'react-router'
import cameraService from '../../services/cameraService';
import CatalogItem from './CatalogItem';

export default function Catalog(){

    const [cameras,setCameras] = useState([]);
    
    useEffect(()=>{
        cameraService.getAll()
        .then(setCameras)
    },[])
    return(
        <section>
            <h1>Cameras</h1>
            {cameras.length !== 0 ? cameras.map(camera=> <CatalogItem key={camera._id} {...camera} /> ) : <h3>No Cameras yet!</h3>}
            
           
            
        </section>
    )
}