import { Router } from "express"
import userController from "./controllers/userController.js";
import cameraController from "./controllers/cameraController.js";


const routes = Router();





routes.use('/users', userController);

routes.use('/cameras', cameraController)




export default routes;