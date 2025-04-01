import { useNavigate, useParams, Navigate} from "react-router";
import { useEditUser, useGetUser } from "../../api/authApi"
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function EditProfile(){
        const { editUserProfile } = useEditUser();
        const navigate = useNavigate();
        const { fetchedUser } = useParams();
        const { user } = useGetUser(fetchedUser);
        const [error,setError] = useState(null)
        const {userId} = useContext(UserContext);


        if(user._id !== userId){
            return <Navigate to="/" replace/>
        }
       

        const submitEditAction = async (formData) =>{
            const userData = Object.fromEntries(formData);

            try{
                await editUserProfile(user._id,userData);
                navigate(`/user/${user._id}`);
            }catch(err){
                setError(err.message);
                setTimeout(() => {
                    setError(null)
                }, 3000);
            }

           

        }

    return(
        <div id="formHolder">
            <form action={submitEditAction}>
                <h3>Update user info</h3>
                <label htmlFor="profileImageUrl">Image Url:</label>
                <input type="text" id="profileImageUrl" name="profileImageUrl" defaultValue={user.profileImageUrl}/>

                <label htmlFor="bio">Bio:</label>
                <textarea type="text" id="bio" name="bio" defaultValue={user.bio}></textarea>

                <input type="submit" className="btn submit" value="Edit Profile Info" />
                {error? <p>{error}</p> : <></>}
               
            </form>
        </div>
    )
}