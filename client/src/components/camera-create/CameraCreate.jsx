import { useState } from "react";
import { useCreateCamera } from "../../api/cameraApi";
import {useNavigate} from 'react-router';
import styles from './CameraCreate.module.css';

export default function CameraCreate(){

    const navigate = useNavigate();
    const { create } = useCreateCamera();
    const [formData, setFormData] = useState({
        make: "",
        model: "",
        price: "",
        year: "",
        resolution: "",
        imageUrl: "",
        description: ""
    });
    const [error,setError] = useState(null);
    const [isDisabled,setDisabled] = useState(false);

    
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const createHandler = async (e) =>{
       
        const {make,model,price,year,resolution,imageUrl,description} = formData;

        let isValid = make && model && price && year && resolution && imageUrl && description;

        if(!isValid){
            setError('All fields are required!');
            setDisabled(true);
            setTimeout(() => {
                setError(null);
                setDisabled(false);
            }, 3000);
            return;
        }

        try{

            await create({make,model,price,year,resolution,imageUrl,description});

            navigate('/cameras');
        }catch(err){
            setError(err.message);
            setDisabled(true);
            setTimeout(() => {
                setError(null);
                setDisabled(false);
            }, 3000);
        }

        
    }

    return(
        <div>
            <form className={styles.loginForm} action={createHandler}>
                <div className={styles.headers}>
                <h1>Post a camera</h1>
                </div>
               <div className={styles.groups}>
                <div className={styles.formGroup}>
                <label htmlFor="make">Make:</label>
                <input type="text" id="make" name="make" 
                value={formData.make}
                onChange={handleInputChange}/>
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="model">Model:</label>
                <input type="text" id="model" name="model" value={formData.model} 
                onChange={handleInputChange}/>
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price"  value={formData.price} 
                onChange={handleInputChange}/>
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="year">Year:</label>
                <input type="number" id="year" name="year" value={formData.year} 
                onChange={handleInputChange}/>
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="resolution">Resolution:</label>
                <input type="text" id="resolution" name="resolution" value={formData.resolution}
                onChange={handleInputChange} />
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="imageUrl">Image Url:</label>
                <input type="text" id="imageUrl" name="imageUrl" 
                value={formData.imageUrl}
                onChange={handleInputChange}/>
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description"
                value={formData.description} 
                onChange={handleInputChange}/>
                </div>
                </div>
                <input type="submit" className="btn submit" value="Create" disabled={isDisabled}/>
                {error ? <p className={styles.errorMessage}>{error}</p> : <></>} 
            </form>
            
        </div>
    )
}