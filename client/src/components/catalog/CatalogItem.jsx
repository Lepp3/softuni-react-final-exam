import { Link } from "react-router"
import { useGetUser } from "../../api/authApi"

export default function CatalogItem(camera){

    const { user } = useGetUser(camera.ownerId);

    return(
        <div>
                    <img src={camera.imageUrl} alt="Camera Image"/>
                    <h2>{camera.make} {camera.model}</h2>
                    <p>{camera.price} $</p>
                    <p>Posted by {user.username}</p>
                    <p>{camera.likedBy?.length} likes</p>
                    <p>{camera.comments?.length} comments</p>
                    <Link to={`/cameras/${camera._id}/details`}>Details</Link>
                    </div>
    )
}