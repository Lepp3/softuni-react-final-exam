import requester from "../utils/requester";


const baseUrl = 'http://localhost:3030/cameras'


export default {
     createCamera(cameraData){

        return requester.post(`${baseUrl}/create`, cameraData)
    },
    async getAll(){
        const response = await fetch(baseUrl)
        const result = await response.json();

        return result
    },
    async getOne(cameraId){
        const response = await fetch(`${baseUrl}/${cameraId}`);
        const result = await response.json();

        return result
    },
    async editCamera(cameraData,cameraId){
        const response = await fetch(`${baseUrl}/${cameraId}/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cameraData)
        });

        const result = await response.json();

        return result;
    }
}