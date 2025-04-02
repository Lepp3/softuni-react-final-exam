import { Link } from "react-router";
import { useGetUser } from "../../api/authApi";
import styles from "./CatalogItem.module.css";

export default function CatalogItem(camera){

    const { user } = useGetUser(camera.ownerId);

    return(
        <Link to={`/cameras/${camera._id}/details`}> <div className={styles.mainFrame}>
            <div className={styles.imageHolder}>
                <img src={camera.imageUrl} alt="Camera Image"/>
            </div>
            <div className={styles.headings}>
                    <h2>{camera.make} {camera.model}</h2>
                    <div><p>Posted by</p> <p><Link to={`/user/${user._id}`}>{user.username}</Link></p></div>
            </div>
            <div className={styles.shortInfo}>
            <p>Price: {camera.price} $</p>
            <p className={styles.postDate}>Posted on {camera.createdAt}</p>
            </div>
            <div className={styles.metrics}>
                <div className={styles.commentsAndLikes}>
                    <p>{camera.likedBy?.length} recommendation/s</p>
                    <p>{camera.comments?.length} comment/s</p>
                </div>
            </div>
        </div>
        </Link>
    )
}