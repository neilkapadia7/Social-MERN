const mongoose = require("mongoose");

const LikeSchema = mongoose.Schema({
	post_id: {
		type: String,
		required: true,
	},
	user: {
		type: String,
		required: true,
	},
	user_id: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("like", LikeSchema);
