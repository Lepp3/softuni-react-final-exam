import { useParams } from "react-router"
import { useGetUser } from "../../api/authApi";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import CatalogItem from "../catalog/CatalogItem";

export default function ProfilePage(){
    const { fetchedUser } = useParams();
    const { user } = useGetUser(fetchedUser);
    const { userId } = useContext(UserContext);

    console.log(user);
    console.log(userId);
    return(
        
        <section>
            {!user ? <p>Loading...</p> :
            <div id="userInfo">
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p></p>
            <p></p>
            {(userId === user._id ? <p>BUTONI</p>:
                <>  </>)}
                <div id="likedPosts">
                    <h3>LIKED POSTS</h3>
                    {user.likedPosts?.length > 0 ? 
                        user.likedPosts.map(post=> <div key={post._id}><CatalogItem {...post}/></div>) :
                        <p>No liked posts yet</p>}
                </div> 
                </div>}
            
        </section>
    )
}