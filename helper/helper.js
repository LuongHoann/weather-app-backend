import bcrypt from "bcryptjs";


const hashUserPassword = (userPassword) => {
    var salt = bcrypt.genSaltSync(10); // thuật toán password
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
  };

module.exports = { 
    hashUserPassword
 }