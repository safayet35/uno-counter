import mongoose from "mongoose";
import _config from "../config/config.js";
const connectDb = async () => {
	try {
		await mongoose.connect(_config.mongodb_uri);
		console.log("Mongodb connected successfully");
	} catch (e) {
		console.log("Mongodb connection error");
		process.exit(1);
	}
};

export default connectDb