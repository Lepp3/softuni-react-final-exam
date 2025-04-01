import { Link } from "react-router"
import { useGetUser } from "../../api/authApi"

export default function CatalogItem(camera){

    const { user } = useGetUser(camera.ownerId);

    return(
        <div>
                    <img src={camera.imageUrl} alt="Camera Image"/>
                    <h2>{camera.make} {camera.model}</h2>
                    <p>{camera.price} $</p>
                    <p>Posted by <Link to={`/user/${user._id}`}>{user.username}</Link></p>
                    <p>{camera.likedBy?.length} recommendations</p>
                    <p>{camera.comments?.length} comment/s</p>
                    <Link to={`/cameras/${camera._id}/details`}>Details</Link>
                    </div>
    )
}