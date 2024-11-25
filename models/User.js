const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    role:{
      type:String,
      default: "member",
      enum: ['admin', 'member']
    },

    imageProfile: {
      type: String,
      default:
        "https://ik.imagekit.io/ku9epk6lrv/user%20(1).png?updatedAt=1701280630365",
    },
  },
  {
    timestamps: true,
  },
);
const User = mongoose.model("User", user);

module.exports = User;
