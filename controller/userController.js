// axios restful api
import { createNewUser } from "../service/userService.js";

const createNewUserController = async (req, res) => {
  try {
    let data = await createNewUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (err) {
    return res.status(500).json({
      EM: "error from servere",
      EC: "-1",
      DT: "",
    });
  }
};

//


export {
  createNewUserController,
};
