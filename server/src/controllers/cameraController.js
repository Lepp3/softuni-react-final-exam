import { Router } from "express";
import cameraService from "../services/cameraService.js";
import { auth, isAuth } from "../../middlewares/authMiddleware.js";


const cameraController = Router();


function buildFilter(query){
    const filterResult = Object.keys(query).reduce((filter, filterParam)=>{
        //replace double quotes
        const filterParamValue = query[filterParam].replaceAll('"', '')
        const searchParam = new URLSearchParams(query[filterParamValue]);
        const result = {...filter,...Object.fromEntries(searchParam.entries())}

        return result
    },{});

    return filterResult
}

//get all
cameraController.get('/', async (req,res)=>{
    const filter = buildFilter(req.query);

    const cameras = await cameraService.getAll(filter)
    
    res.status(200).json(cameras);
});

//get one
cameraController.get('/:cameraId', async (req,res)=>{
    const cameraId = req.params.cameraId;

    try{
        const camera = await cameraService.getOneCamera(cameraId);
        if(!camera){
            throw new Error('No record found!');
        }
        res.json(camera);
    }catch(err){
        res.status(404).json('Nothing found!');
    }
    
})

//create
cameraController.post('/create', auth ,async (req,res)=>{

    const cameraData = req.body;
    const userId = req.user.id;

    try{
        const createdCamera = await cameraService.createCamera(cameraData,userId);
        if(!createdCamera){
            throw new Error('Failed to create camera!');
        }
        res.status(201).json(createdCamera)
    }catch(err){
        res.status(500).json({error: err.message});
    }
    

})

cameraController.get('/create', async (req,res)=>{
    res.status(204).end();
})

//edit one
cameraController.put('/:cameraId',auth, async(req,res)=>{
    const cameraId = req.params.cameraId;
    const cameraInfo = req.body;
    

    try{
        const updatedCamera = await cameraService.updateCamera(cameraId,cameraInfo);
        if(!updatedCamera){
            throw new Errror('Update failed')
        }
        res.status(200).json(updatedCamera)
    }catch(err){
        res.status(500).json('Update failed')
    }
});

//delete one
cameraController.delete('/:cameraId', auth,async(req,res)=>{
    const cameraId = req.params.cameraId;

    try{
        const successfullDeletion = await cameraService.deleteCamera(cameraId);
        if(!successfullDeletion){
            throw new Error('Deletion incomplete!');
        };
        res.status(200).json(successfullDeletion._id);
    }catch(err){
        res.status(500).json(err.message);
    }
});


cameraController.post('/:cameraId/like', auth, async (req,res)=>{
    const cameraId = req.params.cameraId;
    const userId = req.user.id;
   

    try{
        const likeInfo = await cameraService.likeCamera(cameraId,userId);
        if(!likeInfo){
            throw new Error('Failed to like.')
        }
        res.status(200).json(likeInfo);
    }catch(err){
        res.status(500).json(err.message);
    }
});


cameraController.post('/:cameraId/comments', auth ,async (req,res)=>{
    const cameraId = req.params.cameraId;
    const userId = req.user.id;
    const commentData = req.body;
   

    try{
        const comment = await cameraService.postComment(userId,cameraId,commentData);
        res.status(200).json(comment)
    }catch(err){
        res.status(500).json(err.message);
    }
});

cameraController.delete('/:cameraId/comments/:commentId', auth, async(req,res)=>{
    const cameraId = req.params.cameraId;
    const commentId = req.params.commentId;
    const userId = req.user.id;

    try{
        const deletedComment = await cameraService.deleteComment(userId,cameraId,commentId);
        res.status(200).json(deletedComment);
    }catch(err){
        res.status(500).json(err.message);
    }
})










export default cameraController