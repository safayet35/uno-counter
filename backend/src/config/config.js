import dotenv from "dotenv";
dotenv.config();
const _config = {
   port:process.env.PORT,
	mongodb_uri: process.env.MONGODB_URI,
	jwt_secret: process.env.JWT_SECRET,
	jwt_expiry: process.env.JWT_EXPIRY,
	cors_origin:process.env.CORS_ORIGIN
};

export default _config;

