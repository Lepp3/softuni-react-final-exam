import { useContext, useEffect,useState } from 'react'
import {useParams, Link, useNavigate} from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import { useCamera, useDeleteCamera, useLikeCamera, usePostComment, useRemoveLiked } from '../../api/cameraApi';
import SingleComment from './SingleComment';
import styles from './CameraDetails.module.css';



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
    const { unlikeCamera } = useRemoveLiked();
    const [error,setError] = useState(null);
    const [form,setForm] = useState({content: ''});
    const [touched,setTouched] = useState({});
    const defaultCameraPhoto = "/images/stock-camera.jpg";
    const [imageSrc,setImageSrc] = useState(camera.imageUrl || defaultCameraPhoto);
    const [actionError,setActionError] = useState(null)

    const handleChange = (e)=>{
        
        setForm({...form,[e.target.name]: e.target.value});
    }

    const handleTouch = (e) =>{
        
        setTouched({...touched,[e.target.name]: true});
    }


    const isCommentValid = (comment) => comment.length >= 2;
    const isCommentFilled = () => ((Object.keys(touched).length === Object.keys(form).length) && isCommentValid(form.content));
    
    

    useEffect(()=>{
        
        if(userId && camera?.ownerId && camera?.imageUrl){
            setOwner(userId === camera.ownerId);
            setLiked(camera.likedBy.includes(userId));
        }
        if(camera?.comments){
            setComments(camera.comments);
        }
        if(camera?.imageUrl){
            setImageSrc(camera.imageUrl);
        }
    },[userId,camera?.ownerId,camera?.likedBy,camera?.comments, camera?.imageUrl])
    
    
   
    


    const cameraDeleteHandler = async () =>{
        const choice = confirm('Are you sure you want to delete this camera?');
        if(!choice){
            return
        }

        try{
            await deleteCamera(cameraId);
            navigate('/cameras');
        }catch(err){
            setActionError(err.message);
            setTimeout(() => {
                setActionError(null)
            }, 3000);
        }

        

    }

    const likeCameraHandler = async () =>{
      
       try{
            await likeCamera(cameraId);
            setLiked(true);
        
            setCamera(oldState => ({
             ...oldState,
            likedBy: [...oldState.likedBy, userId]
        }));
        }catch(err){
            setActionError(err.message);
            setTimeout(() => {
            setActionError(null)
                }, 3000);
    }
       
       
       
    };

    const cameraUnlikeHandler = async () =>{
        await unlikeCamera(cameraId);
        setLiked(false);

        setCamera(oldState => ({
            ...oldState,
            likedBy: oldState?.likedBy.filter(likedUsers=>likedUsers !== userId)
           }));

           

           try{
            await unlikeCamera(cameraId);
            setLiked(false);

            setCamera(oldState => ({
            ...oldState,
            likedBy: oldState?.likedBy.filter(likedUsers=>likedUsers !== userId)
           }));
        }catch(err){
            setActionError(err.message);
            setTimeout(() => {
            setActionError(null)
                }, 3000);
    }
    }

    const postCommentHandler = async (formData) =>{
        const commentData = Object.fromEntries(formData);
        

        try{
            const result = await postComment(cameraId, commentData);
            setCamera(oldState =>({
                ...oldState,
                comments: [...oldState?.comments ,result]
            }))
        }catch(err){
            setError(err.message);
            setTimeout(() => setError(null), 3000);
        }
       
        
        
        
    }

    const handleDelete = (deletedComment) =>{
        
        setCamera(oldState => ({
            ...oldState,
            comments: oldState?.comments.filter(comment=>comment._id !== deletedComment._id)
        }));
    }

    return(
        <div>
       <section className={styles.frame}>
        {!camera ? <p>Loading camera info...</p> : 
        <div className={styles.mainPart}>
            <div className={styles.infoColumn}>
            <div className={styles.allContent}>
            <div className={styles.heading}>
            <h2>{camera.make} {camera.model}</h2>
            <div className={styles.postDate}>
              <Link to={`/user/${camera.ownerId}`}>Visit the author's page</Link>
                </div>
                <div className={styles.information}>
                <p>Resolution: {camera.resolution}</p>
                <p>Price: {camera.price} $</p>
                <p>Year of model: {camera.year}</p>
             </div>
        </div>
        </div>
        <div className={styles.imgAndDesc}>
        <div className={styles.imgHolder}>
        <img 
            src={imageSrc} 
            alt='Camera Image' 
            onError={()=>
            setImageSrc(defaultCameraPhoto)}
            />
        </div>
        <div className={styles.description}>
            <h3>Description:</h3>
            <p>{camera.description}</p>
        </div>
        <div></div>
        <div className={styles.actionButtons}>
            {isOwner ? 
            <div className={styles.controlButtons}>
            <div className={styles.ownerButton}> <Link to={`/cameras/${cameraId}/edit`}>Edit</Link></div>
            <div className={styles.ownerButton} onClick={cameraDeleteHandler}> Delete</div>
            </div>
            :
            <></>
            }   
            {camera?.likedBy?.length > 0 ?
            camera.likedBy.length === 1 ?
                <p>{camera.likedBy.length} person recommends this camera</p>
                : <p>{camera.likedBy.length} people recommend this camera</p>
        : <p>Be the first to recommend this camera</p>}
            {( !isOwner && !hasLiked && userId) && <div className={styles.ownerButton} onClick={likeCameraHandler}>Recommend this camera</div>}
            {( !isOwner && hasLiked && userId) && <div className={styles.ownerButton} onClick={cameraUnlikeHandler}>Remove recommendation</div>}
            {actionError ? <div id='actionError'>{actionError}</div> : <></>}
            
    </div>
        </div>
            </div>
    <div className={styles.commentSection}>
        <h3>Comments:</h3>
        <section>
            {comments.length > 0 ?
             <div className={styles.postedComments}>
                {comments.map(comment=><SingleComment key={comment._id} {...comment} onDelete={handleDelete} isPublicationOwner={isOwner}/>)}
                </div>
                :
                <p className={styles.postedComments}>No comments yet</p>
                }
        </section>
    </div>
    <div className={styles.commentInput}>
    {userId ? <div className={styles.commentForm}><form action={postCommentHandler}>
            <h1>Post a comment</h1>
            <div className={styles.mainForm}>
            <label htmlFor="content"><p>Your comment:</p></label>
            <textarea  id="content" name="content" rows="3" cols="20"
                onChange={handleChange} 
                onBlur={handleTouch} 
                value={form.value}
                className={(touched.content && !isCommentValid(form.content)) ? 'invalid' : ''}
            ></textarea>
            
            <input 
                type="submit" 
                className="btn submit"
                value="Post comment" 
                disabled={!isCommentFilled()}/>
                </div>
                {(touched.content && !isCommentValid(form.content)) && <p>Minimum comment length is 2 characters!</p>}
                
            {error ? 
            <p className={styles.errorSpace}>{error}</p> :
             <></>}
        </form>
        </div>:
        <></>}
    </div>
    </div>}
        
       </section>
       </div>
    )
}