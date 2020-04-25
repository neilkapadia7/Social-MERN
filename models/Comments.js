const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
	post_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "posts",
	},
	user: {
		type: String,
		required: true,
	},
	user_id: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("comment", CommentSchema);
