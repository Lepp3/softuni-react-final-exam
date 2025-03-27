const baseUrl = 'http://localhost:3030/cameras'


export default {
    async createCamera(cameraData){
        const response = await fetch(`${baseUrl}/create`, {
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