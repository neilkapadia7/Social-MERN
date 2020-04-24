const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	post: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("post", PostSchema);
