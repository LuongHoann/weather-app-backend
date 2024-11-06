import Users from "../schema/user.schema";
import bcrypt from "bcryptjs";

const userLoginService = async (username, password) => {
  const user = await Users.findOne({
    username: username,
  }).exec();

  if(user && bcrypt.compare(password,user.password)){ 
    return user
  }

  return false
};

module.exports = {
  userLoginService,
};
