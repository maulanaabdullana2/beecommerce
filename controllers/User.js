const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/Apierror");
const User = require("../models/User");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return next(new ApiError("Email address not registered", 404));
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return next(new ApiError("Sorry, wrong password", 400));

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET || "aaaaaa", {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESHTOKEN_SECRET || "aaaaaa",
      {
        expiresIn: "1h",
      },
    );

    user.refreshToken = refreshToken;
    await user.save();
    const data = {
      accessToken: accessToken,
    };
    res.cookie("refreshToken", refreshToken);
    res.status(200).json({
      status: "Success",
      message: "Login Successfully",
      data,
    });
  } catch (error) {
    next(new ApiError(error.message));
  }
};


const register = async (req, res, next) => {
    const { email, password, fullname, phoneNumber } = req.body;
    try {
        const existinguser = await User.findOne({email})
        if(existinguser){
            return next(new ApiError("Email Address already registered", 409));
        }

        const exitingPhoneNumber = await User.findOne({phoneNumber})
        if(exitingPhoneNumber){
            return next(new ApiError("Phone Number already registered", 409));
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
          fullname,
          email,
          phoneNumber,
          password: hashedPassword,
        });

        res.status(200).json({
            status: "success",
            message: "User registered successfully",
            newUser
        })

    } catch (error) {
        next(new ApiError(error, 400));   
    }
}


module.exports = {
    login,
    register
}