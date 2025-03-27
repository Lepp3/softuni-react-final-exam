import { Link } from "react-router"

export default function CatalogItem(camera){
    return(
        <div>
                    <img src={camera.imageUrl} alt="Camera Image"/>
                    <h2>{camera.make} {camera.model}</h2>
                    <p>{camera.price} $</p>
                    <p>Number of likes</p>
                    <p>Potential number of comments</p>
                    <Link to={`/cameras/${camera._id}/details`}>Details</Link>
                    </div>
    )
}