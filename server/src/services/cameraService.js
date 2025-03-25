import Camera from "../models/Camera.js";


export default {
    async getAll(){
        return Camera.getAll().lean();
    },
    async getOneCamera(cameraId){
        return Camera.findOne({id: cameraId})
    },
    async createCamera(cameraData,userId){
        

        return Camera.create({...cameraData,ownerId: userId});
    },
    async updateCamera(cameraId,cameraData){
        const camera = await this.getOneCamera(cameraId);

        return Camera.findByIdAndUpdate(cameraId,cameraData)
    }
}