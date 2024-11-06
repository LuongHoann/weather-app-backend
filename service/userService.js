import Users from "../schema/user.schema";
import { hashUserPassword } from "../helper/helper";

const isEmailExist = async (email) => {
  try {
    let res = await Users.findOne({ email: email });
    return res ? res : false; // if have user ( res ) return true // false if not
  } catch (err) {
    console.error(err);
    throw new Error("Database error while checking email");
  }
};

// create new user  function with email // password // username
const createNewUser = async (data) => {
  let { password, username, email } = data;
  let hashPassword = await hashUserPassword(password);
  // check user's email exist
  const isUserEmailExist = await isEmailExist(email);

  if (isUserEmailExist) {
    return {
      EM: "Your email already exists ! Please choose another email to register",
      EC: 1,
      DT: [],
    };
  }

  //  create user
  try {
    await Users.create({
      email: email,
      password: hashPassword,
      username: username,
    });
    return {
      EM: "create ok",
      EC: 0,
      DT: [],
    };
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createNewUser,
  isEmailExist
};
