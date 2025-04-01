import { useContext, useEffect,useState,useRef } from 'react'
import {useParams, Link, useNavigate} from 'react-router'
import { UserContext } from '../../contexts/UserContext';
import { useCamera, useDeleteCamera, useLikeCamera, usePostComment, useRemoveLiked } from '../../api/cameraApi';
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
    const { unlikeCamera } = useRemoveLiked();
    const [error,setError] = useState(null);
    const [form,setForm] = useState({content: ''});
    const [touched,setTouched] = useState({});
    const defaultCameraPhoto = "/public/images/stock-camera.jpg";
    const [imageSrc,setImageSrc] = useState(camera.imageUrl || defaultCameraPhoto);

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
       
       
       
    };

    const cameraUnlikeHandler = async () =>{
        await unlikeCamera(cameraId);
        setLiked(false);

        setCamera(oldState => ({
            ...oldState,
            likedBy: oldState?.likedBy.filter(likedUsers=>likedUsers !== userId)
           }));
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
       <section>
        {!camera ? <p>Loading camera info...</p> : 
        <div>
        <h1>{camera.make}</h1>
        <h2>{camera.model}</h2>
        <img src={imageSrc} alt='Camera Image' onError={()=>
            setImageSrc(defaultCameraPhoto)}/>
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
            {( !isOwner && !hasLiked && userId) && <div className='btn' onClick={likeCameraHandler}>Recommend this camera</div>}
            {( !isOwner && hasLiked && userId) && <div className='btn' onClick={cameraUnlikeHandler}>Remove recommendation</div>}
            
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
            <textarea  id="content" name="content" rows="3" cols="20"
            onChange={handleChange} onBlur={handleTouch} value={form.value}
            className={(touched.content && !isCommentValid(form.content)) ? 'invalid' : ''}
            ></textarea>
            {(touched.content && !isCommentValid(form.content)) && <p>Minimum comment length is 2 characters!</p>}
            <input type="submit" className="btn submit" value="Post comment" disabled={!isCommentFilled()}/>
            {error ? <p>{error}</p> : <></>}
        </form> :
        <></>}
        
    </div>
    </div>}
        
       </section>
    )
}