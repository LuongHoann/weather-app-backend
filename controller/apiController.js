import { userLoginService } from "../service/userApiService";
import jwt from "jsonwebtoken"


const userLoginApi = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  // try {
    let user = await userLoginService(username, password);
    if (user) {
      let payload = {
        email: user.email,
        id : user._id
      };
      
      const accessToken = await jwt.sign(payload, process.env.JWT_ACCESS_KEY , { 
        expiresIn : process.env.JWT_ACCESS_TOKEN_EXPIRESIN
      })
      const refreshToken = await jwt.sign(payload, process.env.JWT_REFERSH_KEY , { 
        expiresIn : process.env.JWT_REFRESH_TOKEN_EXPIRESIN
      })
      
      res.cookie("access_token" , accessToken ,{
        httpOnly : true , 
        sameSite : "strict",
        maxAge : new Date( Date.now() +  360000)
      })
      
      res.cookie("refresh_token" , refreshToken, { 
        httpOnly : true , 
        sameSite : "strict",
        maxAge :  new Date( Date.now() + 36000)
      })
      
      return res.status(201).json({
        EM: "Login Success ! ",
        EC: 0,
        DT: {
          username: user.username,
          email: user.email,
          token: {
            access_token: accessToken,
            refresh_token: refreshToken
          },
        },
      });
    
  }
  // doesn't have user return 
  return res.status(404).json({
    EM: "ACCOUNT NOT FOUND ! please re-check your account ",
    EC: -1,
    DT: [],
  });
};

module.exports = {
  userLoginApi,
};
