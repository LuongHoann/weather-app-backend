import jwt from "jsonwebtoken";
require("dotenv").config();
//
// free route
const nonSecurePaths = ["/", "/login", "/register", "/account"];
//
// const createJWT = (payload) => {
//   let key = process.env.JWT_SECRET;
//   let token = null;
//   try {
//     token = jwt.sign(payload, key, { expiresIn: 30000 });
//   } catch (err) {
//     console.log(err);
//   }

//   return token;
// };

// check token
const verifyToken = (token , key) => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (err) {
    console.log(err);
  }
  return decoded;
};

const checkUserWithJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    // let token = cookies.jwt;
    let token  = cookies.access_token;
    let decoded = verifyToken(token , process.env.JWT_ACCESS_KEY);
    console.log("decoded" ,decoded)
    if (decoded) {
      req.user = decoded;
      req.token = token;
      console.log(req.user)
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated the user",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated the user",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) {
    return next();
  }
  console.log("path==", nonSecurePaths.includes(req.path), req.path);
  console.log("req2====", req.user);
  if (req.user) {
    let email = req.user.email;
    let roles = req.user.groupWithRoles.Roles;
    let currentUrl = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "you don't have permission to access this resource",
      });
    }
    let canAcess = roles.some((item) => item.url === currentUrl);
    if (canAcess) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "you dont hav permission to access this resource",
      });
    }
  }
};
module.exports = {
  verifyToken,
  checkUserWithJWT,
  checkUserPermission,
};
