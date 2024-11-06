import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username:String,
  activeCode:String,
});

const Users = mongoose.models.User || mongoose.model("User", userSchema);

export default Users
