import Favourite from "../schema/favaourite.schema";


const createNewLocation = async(data)=> { 
    const { lat , long , savedName , id} = data
    try { 
      await Favourite.create({lat:lat , long:long , savedName: savedName , userId: id})
      return {
        EM: "create ok",
        EC: 0,
        DT: [],
      };
    } catch (err) {
      return { 
        EM: "Some thing wrong ! Try again later" ,
        EC: -1,
        DT: []
    }
    }
  }

const getAllFavouriteLocation  = async(email)=> { 
  try { 
     let data = await Favourite.find({email: email})
     return { 
       EM: "",
       EC:0,
       DT: data
     }

  } catch(err){ 
    return { 
        EM: "Some thing wrong ! Try again later" ,
        EC: -1,
        DT: []
    }
  }

}
  module.exports = {
    createNewLocation,
    getAllFavouriteLocation
  }