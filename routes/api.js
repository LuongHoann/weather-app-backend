import express from "express";

import { createNewUserController } from "../controller/userController.js";
import { userLoginApi } from "../controller/apiController.js";
import { checkUserWithJWT } from "../middleware/jwtAction.js";

import { getAllFavouriteLocationController , createFavouriteLocation } from "../controller/favouriteLocationController.js";
const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const initApiRoutes = (app) => {
  router.post("/register", createNewUserController);
  router.post("/login", userLoginApi);
  
  //
  router.all("*", checkUserWithJWT);
  router.post("/favourite/create", createFavouriteLocation);
  router.get("/favourite/read", getAllFavouriteLocationController);
  //

  return app.use("/api/v1", router);
};

export default initApiRoutes;
