import { useContext, useEffect,useState,useRef } from 'react'
import {useParams, Link, useNavigate} from 'react-router'
import { UserContext } from '../../contexts/UserContext';
import { useCamera, useDeleteCamera, useLikeCamera } from '../../api/cameraApi';


export default function CameraDetails(){
    const {cameraId} = useParams()
    const navigate = useNavigate();
    const { camera, setCamera } = useCamera(cameraId)
    const { userId } = useContext(UserContext);
    const [isOwner, setOwner] = useState(false);
    const { deleteCamera} = useDeleteCamera();
    const { likeCamera } = useLikeCamera();
    const [hasLiked,setLiked] = useState(false);
    

    useEffect(()=>{
        
        if(userId && camera?.ownerId){
            setOwner(userId === camera.ownerId)
            setLiked(camera.likedBy.includes(userId))
           
        }
    },[userId,camera?.ownerId,camera?.likedBy])
    
    
   
    


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
        </div>
       </section>
    )
}