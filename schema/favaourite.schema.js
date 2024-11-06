import mongoose from 'mongoose';

const FavouriteSchema = new mongoose.Schema({
  lat :{
    type: Number,
    required : true
  },
  long:{
    type: Number,
    required : true
  },
  savedName :{
    type: String,
    required : true
  },
  userId : { 
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
  }
});

const Favourite = mongoose.model("Favourite", FavouriteSchema);

export default Favourite
