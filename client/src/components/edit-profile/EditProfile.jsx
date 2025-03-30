import { useNavigate, useParams } from "react-router";
import { useEditUser, useGetUser } from "../../api/authApi"

export default function EditProfile(){
        const { editUserProfile } = useEditUser();
        const navigate = useNavigate()
        const { fetchedUser } = useParams()
        const { user } = useGetUser(fetchedUser)
       

        const submitEditAction = async (formData) =>{
            const userData = Object.fromEntries(formData);

            await editUserProfile(user._id,userData);
            navigate(`/user/${user._id}`);

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
               
            </form>
        </div>
    )
}