const bcrypt = require("bcrypt");
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		avartat: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		mobile: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		address: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Address",
			},
		],
		wishlist: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Product",
			},
		],
		isBlocked: {
			type: Boolean,
			default: false,
		},
		refreshToken: {
			type: String,
		},
		role: {
			type: String,
			default: "user",
		},
		cart: {
			type: Array,
			required: [],
		},
		passwordChangeAt: {
			type: String,
		},
		passwordResetToken: {
			type: String,
		},
		passwordResetExires: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre('save', async function(next){
	if(!this.isModified('password')){
		next()
	}
	const salt = bcrypt.genSaltSync(10)
	this.password = await bcrypt.hash(this.password, salt)
})
//Export the model
module.exports = mongoose.model("User", userSchema);
