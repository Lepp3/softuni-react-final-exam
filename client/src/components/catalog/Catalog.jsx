
import CatalogItem from './CatalogItem';
import { useCameras } from '../../api/cameraApi';

export default function Catalog(){

    const { cameras } = useCameras()

    
    
    
    return(
        <section>
            <h1>Cameras</h1>
            {cameras.length !== 0 ? cameras.map(camera=> <CatalogItem key={camera._id} {...camera} /> ) : <h3>No Cameras yet!</h3>}
            
           
            
        </section>
    )
}