import { useParams, Link, Outlet} from "react-router"
import { useGetUser } from "../../api/authApi";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import CatalogItem from "../catalog/CatalogItem";

export default function ProfilePage(){
    const { fetchedUser } = useParams();
    const { user } = useGetUser(fetchedUser);
    const { userId } = useContext(UserContext);

    const defaultAvatar = "/public/images/stock-avatar.jpg";
    const [imageSrc,setImageSrc] = useState(user.profileImageUrl || defaultAvatar);


    
    return(
        
        <section>
            {!user ? <p>Loading...</p> :
            <div id="userInfo">
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.bio}</p>
           <img 
           src={imageSrc} 
           alt="User Profile Photo"
           onError={()=>setImageSrc(defaultAvatar)}/>
            {(userId === user._id ? <div id="profileButtons">
                <Link to={`/user/${user._id}/edit`}><button>Edit Profile</button></Link>
            </div>:
                <>  </>)}
                <div id="likedPosts">
                    <h3>Recommended Cameras</h3>
                    {user.likedPosts?.length > 0 ? 
                        user.likedPosts.map(post=> <div key={post._id}><CatalogItem {...post}/></div>) :
                        <p>No liked posts yet</p>}
                </div> 
                <div id="createdPosts">
                <h3>Created Posts</h3>
                    {user.createdPosts?.length > 0 ? 
                        user.createdPosts.map(post=> <div key={post._id}><CatalogItem {...post}/></div>) :
                        <p>No liked posts yet</p>}
                </div>
                </div>}
            
        </section>
    )
}