import { useContext } from "react";
import { useGetUser } from "../../api/authApi"
import { useDeleteComment } from "../../api/cameraApi";
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router";
import styles from './SingleComment.module.css';
import formatDate from "../../utils/dateFormatter";


export default function SingleComment({
    _id,
    ownerId,
    content,
    createdAt,
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
            <div className={styles.singleComment}>
                {(userId === ownerId || isPublicationOwner) && <div className={styles.commentButtons}>
                    <div className={styles.ownerButton} onClick={deleteCommentHandler}>Delete this comment</div>
                </div>}
                
            <div className={styles.commentContent}>
                <div className={styles.metaData}><p>{user?.username} on: 
                     </p> <p>{formatDate(createdAt)}</p></div>
                <p className={styles.content}>{content}</p>
            </div>
            </div>
        )
    
    
}

