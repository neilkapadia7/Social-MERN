const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({});

module.exports = mongoose.model(UserSchema, "user");
