const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	birthdate: {
		type: Date,
		required: false,
	},
	bio: {
		type: String,
		required: false,
	},
	location: {
		type: String,
		required: false,
	},
	website: {
		type: String,
		required: false,
	},
	followers: {
		type: Array,
		required: false,
	},
	following: {
		type: Array,
		required: false,
	},
});

module.exports = mongoose.model('user', UserSchema);
