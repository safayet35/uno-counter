import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import createError from "http-errors";
const registerUser = asyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    const error = createError(401, "All fields are required");
    return next(error);
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = createError(401, "With this email you already register");
    return next(error);
  }

  const user = await User.create({
    fullName,
    email,
    password
  });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Registered successful"));
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = createError(401, "All fields are required");
    return next(error);
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    const error = createError(400, "You are not registered with this email");
    return next(error);
  }

  const isCorrectPass = await existingUser.isCorrectPassword(password);

  if (!isCorrectPass) {
    throw new ApiError(402, "Email or password incorrect");
  }

  const user = await User.findById(existingUser._id).select("-password");

  const token = existingUser.generateAccessToken();
  return res
    .status(200)
    .cookie("accessToken", token)
    .json(new ApiResponse(200, {data:user,token}, "Login successful"));
});

const logoutUser = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    const error = createError(401, "You are not sign in please login first");
    return next(error);
  }

  return res
    .status(200)
    .clearCookie("accessToken")
    .json(new ApiResponse(200, {}, "Logout successfully"));
});

const authCheck = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, "Authenticated"));
});

export { registerUser, loginUser, logoutUser, authCheck };
