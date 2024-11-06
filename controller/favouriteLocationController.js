import { getAllFavouriteLocation , createNewLocation } from "../service/favouriteLocationService";

const getAllFavouriteLocationController = async (req, res) => {
  let user = req.cookies.user; // get email of user was stored in cookies
  try {
    const data = await getAllFavouriteLocation(user);
    return res.status(201).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (err) {
    return res.status(500).json({
      EM: "Some thing wrong from server!",
      EC: -1,
      DT: [],
    });
  }
};

const createFavouriteLocation = async (req, res) => {
    const user = req.user.id    
    req.body = {...req.body ,id: user } // add who you are in parameter
    console.log(req.body)
    try {
      let data = await createNewLocation(req.body);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        EM: "error from server",
        EC: "-1",
        DT: "",
      });
    }
  };

module.exports = {
  getAllFavouriteLocationController,
  createFavouriteLocation,
};
