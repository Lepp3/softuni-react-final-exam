import { Router } from "express";
import cameraService from "../services/cameraService.js";
import { isAuth } from "../../middlewares/authMiddleware.js";


const cameraController = Router();


//get all
cameraController.get('/catalog', async (req,res)=>{
    res.json({message:'It works!'})
});

//get one
cameraController.get('/:cameraId')

//create
cameraController.post('/create', isAuth ,async (req,res)=>{

    const cameraData = req.body;
    const userId = req.user.id;

    const createdCamera = await cameraService.createCamera(cameraData,userId);

    res.status(201).json(createdCamera)

})

cameraController.get('/create', async (req,res)=>{
    res.status(204).end();
})

//edit one
cameraController.put('/:cameraId/edit', async(req,res)=>{

});

//delete one
cameraController.delete('/:cameraId/delete', async(req,res)=>{

})








export default cameraController