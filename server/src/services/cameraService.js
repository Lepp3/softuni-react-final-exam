import Camera from "../models/Camera.js";


export default {
    async getAll(query={}){
        const cameras = Camera.find(query);

        if(query.name){
            cameras.find({ name: { $regex: query.name, options: 'i' } })
        }
        return cameras
    },
    async getOneCamera(cameraId){
        return Camera.findOne({_id: cameraId})
    },
    async createCamera(cameraData,userId){
        return Camera.create({...cameraData,ownerId: userId});
    },
    async updateCamera(cameraId,cameraData){
        

        return Camera.findByIdAndUpdate(cameraId,cameraData, {new: true})
    },
    async deleteCamera(cameraId){
        return Camera.findByIdAndDelete(cameraId);
    },
    getCreatedCameras(userId){
        return Camera.find({ownerId: userId});
    }

}