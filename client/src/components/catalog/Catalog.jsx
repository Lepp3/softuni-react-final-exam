
import CatalogItem from './CatalogItem';
import { useCameras } from '../../api/cameraApi';
import { useState } from 'react';

export default function Catalog(){

    const { cameras,setCameras } = useCameras();
    const [filter,setFilter] = useState("");

    const handleFilter = (e) =>{
        const selectedFilter = e.target.value;
        setFilter(selectedFilter);

        const sortedCameras = [...cameras];

        switch (selectedFilter) {
            case "most-popular":
              sortedCameras.sort((a, b) => b.likedBy.length - a.likedBy.length);
              break;
            case "most-commented":
              sortedCameras.sort((a, b) => b.comments.length - a.comments.length);
              break;
            case "most-recent":
              sortedCameras.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              break;
            case "least-recent":
              sortedCameras.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
              break;
            default:
              break;
          };

          setCameras(sortedCameras);
    }
    
    
    return(
        <section>

        

            <h1>Cameras</h1>

            <label htmlFor="filter">Sort by:</label>
            <select id="filter" value={filter} onChange={handleFilter}>
                <option value="">Select</option>
                <option value="most-liked">Most Liked</option>
                <option value="most-commented">Most Comments</option>
                <option value="most-recent">Most Recent</option>
                <option value="least-recent">Least Recent</option>
            </select>

            {cameras.length !== 0 ? cameras.map(camera=> <CatalogItem key={camera._id} {...camera} /> ) : <h3>No Cameras yet!</h3>}
            
           
            
        </section>
    )
}