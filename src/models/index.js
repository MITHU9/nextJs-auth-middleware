import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
