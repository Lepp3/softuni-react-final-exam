
import CatalogItem from './CatalogItem';
import { useCameras } from '../../api/cameraApi';
import { useState } from 'react';
import styles from './Catalog.module.css'

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
      <div className={styles.catalog}>
        <div className={styles.frame}>
        <section className={styles.catalogSection}>
          <div className={styles.catalogHeader}>
            <h1>Cameras</h1>
          </div>

            <div className={styles.filterHolder}>
            <label htmlFor="filter">Sort by:</label>
              <select id="filter" value={filter} onChange={handleFilter}>
                <option value="">Filters</option>
                <option value="most-liked">Most Liked</option>
                <option value="most-commented">Most Comments</option>
                <option value="most-recent">Most Recent</option>
                <option value="least-recent">Least Recent</option>
            </select>  
          </div> 

            <div className={styles.mainCatalog}>
            {cameras.length !== 0 ? <div className={styles.cameraSection}><div className={styles.cameraList}>{cameras.map(camera=> <CatalogItem key={camera._id} {...camera} /> )}</div></div> : <h3>No Cameras yet!</h3>}
            </div>
           
            
        </section>
        </div>
      </div>
      
        
    )
}