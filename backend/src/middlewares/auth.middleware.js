import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import _config from "../config/config.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
const verifyJwt = asyncHandler(async (req, res, next) => {
	const token =
		req.cookies?.accessToken ||
		req.header("Authorization")?.replace("Bearer ", "");

	if (!token) {
		throw new ApiError(401, "Unauthorized request ");
	}
	const decodedToken =  jwt.verify(token, _config.jwt_secret);

	const user = await User.findById(decodedToken._id).select("-password");

	if (!user) {
		throw new ApiError(401, "Invalid access token or expired token");
	}
	req.user = user;
	next();
});
export default verifyJwt;
