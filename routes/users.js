const express = require("express");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const router = express.Router();
const User = require("../models/User");

// @route  POST    api/users
// @desc   User Register
// @access   Public
router.post(
	"/",
	[
		check("firstName", "Please Add First Name").not().isEmpty(),
		check("lastName", "Please Add Last Name").not().isEmpty(),
		check("email", "Please Enter A Valid Email ID").isEmail(),
		check(
			"password",
			"Please Enter A Password with 6 or More Character"
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { firstName, lastName, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ msg: "User Already Exists!" });
			}

			user = new User({
				firstName,
				lastName,
				email,
				password,
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 36000,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
