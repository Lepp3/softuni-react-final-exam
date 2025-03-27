import requester from "../utils/requester";


const baseUrl = 'http://localhost:3030/cameras'


export default {
     createCamera(cameraData){

        return requester.post(`${baseUrl}/create`, cameraData)
    },
    getAll(){
        return requester.get(baseUrl)
    },
    getOne(cameraId){
        return requester.get(`${baseUrl}/${cameraId}`);
    },
    editCamera(cameraData,cameraId){
        return requester.put(`${baseUrl}/${cameraId}/edit`,cameraData);
    }
}