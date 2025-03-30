import { useContext } from "react";
import { useGetUser } from "../../api/authApi"
import { useDeleteComment } from "../../api/cameraApi";
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router";


export default function SingleComment({
    _id,
    ownerId,
    content,
    onDelete,
    isPublicationOwner}){ 

    const { userId } = useContext(UserContext)
    const { user } = useGetUser(ownerId);
    const { deleteComment } = useDeleteComment();
    const { cameraId } = useParams();

    
    
    
    
    const deleteCommentHandler = async () =>{
        const choice = confirm('Are you sure you want to delete this comment?');
        if(!choice){
            return
        }

        const result = await deleteComment(cameraId,_id);
        onDelete(result);
        

    }
    
        return(
            <div id="singleComment">
                {(userId === ownerId || isPublicationOwner) && <div id="commentButtons">
                    <button onClick={deleteCommentHandler}>Delete this comment</button>
                </div>}
                
            <div id="commentContent">
                <p>Author: {user?.username}</p>
                <p>Said: {content}</p>
            </div>
            </div>
        )
    
    
}

