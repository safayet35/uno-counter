import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import _config from "../config/config.js";
const userSchema = mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			trim: true
		},
		password: {
			type: String,
			required: true,
			trim: true
		},
		profileImage: {
			type: String,
			default: ""
		},
		roundes: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Round"
		}]
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	console.log(salt);
	this.password =await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.isCorrectPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken =  function () {
	const token =  jwt.sign(
		{
			_id: this._id,
			fullName: this.fullName,
			roundes: this.roundes
		},
		_config.jwt_secret,
		{ expiresIn: _config.jwt_expiry }
	);

	return token;
};

const User = mongoose.model("User", userSchema);

export default User;
