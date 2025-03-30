import { useContext, useEffect,useState,useRef } from 'react'
import {useParams, Link, useNavigate} from 'react-router'
import { UserContext } from '../../contexts/UserContext';
import { useCamera, useDeleteCamera, useLikeCamera, usePostComment } from '../../api/cameraApi';
import SingleComment from './SingleComment';


export default function CameraDetails(){
    const { cameraId } = useParams()
    const navigate = useNavigate();
    const { camera, setCamera } = useCamera(cameraId)
    const { userId } = useContext(UserContext);
    const [isOwner, setOwner] = useState(false);
    const { deleteCamera} = useDeleteCamera();
    const { likeCamera } = useLikeCamera();
    const [hasLiked,setLiked] = useState(false);
    const { postComment } = usePostComment()
    const [comments,setComments] = useState([]);
    
    

    useEffect(()=>{
        
        if(userId && camera?.ownerId){
            setOwner(userId === camera.ownerId);
            setLiked(camera.likedBy.includes(userId));
            
           
        }
        if(camera?.comments){
            setComments(camera.comments);
        }
    },[userId,camera?.ownerId,camera?.likedBy,camera?.comments])
    
    
   
    


    const cameraDeleteHandler = async () =>{
        const choice = confirm('Are you sure you want to delete this camera?');
        if(!choice){
            return
        }

        await deleteCamera(cameraId);
        navigate('/cameras');

    }

    const likeCameraHandler = async () =>{
       await likeCamera(cameraId);
       setLiked(true);
       
       setCamera(oldState => ({
        ...oldState,
        likedBy: [...oldState.likedBy, userId]
       }))
       
       
       
    }

    const postCommentHandler = async (formData) =>{
        const commentData = Object.fromEntries(formData);
        const result = await postComment(cameraId, commentData);
        if(!result){
            return
        }
        
        setCamera(oldState =>({
            ...oldState,
            comments: [...oldState?.comments ,result]
        }))
        
    }

    const handleDelete = (deletedComment) =>{
        
        setCamera(oldState => ({
            ...oldState,
            comments: oldState?.comments.filter(comment=>comment._id !== deletedComment._id)
        }));
    }

    return(
       <section>
        <div>
            <h1>{camera.make}</h1>
            <h2>{camera.model}</h2>
            <img src={camera.imageUrl} alt='Camera Image'/>
            <p>Price: {camera.price} $</p>
            <p>Created in: {camera.year}</p>
            <p>Resolution: {camera.resolution}</p>
            <div>
                <h3>Description</h3>
                <p>{camera.description}</p>
            </div>
            
            <div className='buttons'>
                {isOwner ? 
                <div className="ownerButtons">
                <div className='btn'> <Link to={`/cameras/${cameraId}/edit`}>Edit</Link></div>
                <div className='btn' onClick={cameraDeleteHandler}> Delete</div>
                </div>
                :
                <></>
                }   
                {camera?.likedBy?.length > 0 ?
                camera.likedBy.length === 1 ?
                    <p>{camera.likedBy.length} person recommends this camera</p>
                    : <p>{camera.likedBy.length} people recommend this camera</p>
            : <></>}
                {( !isOwner && !hasLiked && userId) && <div className='btn' onClick={likeCameraHandler}>Recommend this camera!</div>}
                
        </div>
        <div id="commentSection">
            <section>
                {comments.length > 0 ?
                 <div id="existingComments">
                    {comments.map(comment=><SingleComment key={comment._id} {...comment} onDelete={handleDelete} isPublicationOwner={isOwner}/>)}
                    </div>
                    :
                    <p>No comments yet</p>
                    }
            </section>

        {userId ? <form action={postCommentHandler}>
                <h1>Post a comment</h1>

                <label htmlFor="content">Your comment:</label>
                <textarea  id="content" name="content" rows="5" cols="33"></textarea>
                <input type="submit" className="btn submit" value="Post comment" />
            </form> :
            <></>}
            
        </div>
        </div>
       </section>
    )
}