const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, defaut: "" },
    isAdmin: { type: Boolean, default: false },
    favourites : {type : Array},
    total : { type: Number, default:0},
    isMember : { type: Boolean,default: false}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
