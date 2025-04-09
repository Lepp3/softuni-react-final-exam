import { Router } from "express";
import cameraService from "../services/cameraService.js";
import { auth } from "../../middlewares/authMiddleware.js";


const cameraController = Router();

function buildFilter(query) {
  const filterResult = Object.keys(query).reduce((filter, filterParam) => {
    //replace double quotes
    const filterParamValue = query[filterParam].replaceAll('"', "");
    const searchParam = new URLSearchParams(query[filterParamValue]);
    const result = { ...filter, ...Object.fromEntries(searchParam.entries()) };

    return result;
  }, {});

  return filterResult;
}

//get all
cameraController.get("/", async (req, res) => {
  const filter = buildFilter(req.query);

  const cameras = await cameraService.getAll(filter);

  res.status(200).json(cameras);
});

//get one
cameraController.get("/:cameraId", async (req, res) => {
  const cameraId = req.params.cameraId;

  try {
    const camera = await cameraService.getOneCamera(cameraId);
    if (!camera) {
      throw new Error("No record found!");
    }
    res.json(camera);
  } catch (err) {
    res.status(404).json("Nothing found!");
  }
});

//create
cameraController.post("/create", auth, async (req, res) => {
  const cameraData = req.body;
  const userId = req.user.id;

  try {
    const createdCamera = await cameraService.createCamera(cameraData, userId);
    if (!createdCamera) {
      throw new Error("Failed to create camera!");
    }
    res.status(201).json(createdCamera);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

cameraController.get("/create", async (req, res) => {
  res.status(204).end();
});

//edit
cameraController.put("/:cameraId", auth, async (req, res) => {
  const cameraId = req.params.cameraId;
  const cameraInfo = req.body;

  try {
    const updatedCamera = await cameraService.updateCamera(
      cameraId,
      cameraInfo
    );
    if (!updatedCamera) {
      throw new Errror("Update failed");
    }
    res.status(200).json(updatedCamera);
  } catch (err) {
    res.status(500).json("Update failed");
  }
});

//delete
cameraController.delete("/:cameraId", auth, async (req, res) => {
  const cameraId = req.params.cameraId;

  try {
    const successfullDeletion = await cameraService.deleteCamera(cameraId);
    if (!successfullDeletion) {
      throw new Error("Deletion incomplete!");
    }
    res.status(200).json(successfullDeletion._id);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

cameraController.post("/:cameraId/recommend", auth, async (req, res) => {
  const cameraId = req.params.cameraId;
  const userId = req.user.id;

  try {
    const recommendationInfo = await cameraService.likeCamera(cameraId, userId);
    if (!recommendationInfo) {
      throw new Error("Failed to recommend.");
    }
    res.status(200).json(recommendationInfo);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

cameraController.delete("/:cameraId/recommend", auth, async (req, res) => {
  const cameraId = req.params.cameraId;
  const userId = req.user.id;

  try {
    const removedRecommendation = await cameraService.unlikeCamera(cameraId, userId);
    if (!removedRecommendation) {
      throw new Error("Failed to remove recommendation!");
    }
    res.status(200).json(removedRecommendation);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

cameraController.post("/:cameraId/reviews", auth, async (req, res) => {
  const cameraId = req.params.cameraId;
  const userId = req.user.id;
  const reviewData = req.body;

  try {
    const review = await cameraService.postReview(
      userId,
      cameraId,
      reviewData
    );
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

cameraController.delete(
  "/:cameraId/reviews/:reviewId",
  auth,
  async (req, res) => {
    const cameraId = req.params.cameraId;
    const reviewId = req.params.reviewId;
    const userId = req.user.id;

    try {
      const deletedReview = await cameraService.deleteReview(
        userId,
        cameraId,
        reviewId
      );
      res.status(200).json(deletedReview);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);

cameraController.post("/:cameraId/add-cart", auth, async (req, res) => {
  const cameraId = req.params.cameraId;
  const userId = req.user?.id;
  const quantity = req.body;

  try {
    const updatedUser = await cameraService.addCameraToCart(
      cameraId,
      userId,
      quantity
    );
    if (!addedCamera) {
      throw new Error("Failed to add camera to cart!");
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
});


cameraController.post('/:cameraId/remove-cart', auth, async(req,res)=>{
  const cameraId = req.params.cameraId;
  const userId = req.user?.id;
  const quantity = req.body;
  try {
    const updatedUser = await cameraService.removeCameraFromCart(
      cameraId,
      userId,
      quantity
    );
    if (!updatedUser) {
      throw new Error("Failed to remove camera from cart!");
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }

});


cameraController.post('/checkout', auth, async(req,res)=>{
  const userId = req.user?.id;


  try{
      const updatedUser = await cameraService.checkout(userId);
      if(!updatedUser){
        throw new Error('Failed checkout!');
      };
      res.status(200).json(updatedUser);
  }catch(err){
    res.status(500).json(err.message);
  }
});












export default cameraController