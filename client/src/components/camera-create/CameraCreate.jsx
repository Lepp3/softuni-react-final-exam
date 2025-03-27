import cameraService from "../../services/cameraService";

export default function CameraCreate(){

    const createHandler = async (formData) =>{
        const data = Object.fromEntries(formData);

        const result = await cameraService.createCamera(data);

        console.log(result)
    }

    return(
        <div>
            <form action={createHandler}>
                <h1>Post a camera</h1>

                <label htmlFor="make">Make:</label>
                <input type="text" id="make" name="make" />

                <label htmlFor="model">Model:</label>
                <input type="text" id="model" name="model" />

                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" />

                <label htmlFor="year">Year:</label>
                <input type="number" id="year" name="year" />

                <label htmlFor="resolution">Resolution:</label>
                <input type="text" id="resolution" name="resolution" />

                <label htmlFor="imageUrl">Image Url:</label>
                <input type="text" id="imageUrl" name="imageUrl" />

                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" />

                <input type="submit" className="btn submit" value="Create" />

            </form>
        </div>
    )
}