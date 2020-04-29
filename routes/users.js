const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const router = express.Router();
const User = require('../models/User');

// @route  POST    api/users
// @desc   User Register
// @access   Public
router.post(
	'/',
	[
		check('firstName', 'Please Add First Name').not().isEmpty(),
		check('lastName', 'Please Add Last Name').not().isEmpty(),
		check('email', 'Please Enter A Valid Email ID').isEmail(),
		check(
			'password',
			'Please Enter A Password with 6 or More Character'
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
				return res.status(400).json({ msg: 'User Already Exists!' });
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
				config.get('jwtSecret'),
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
			res.status(500).send('Server Error');
		}
	}
);

// @route  PUT    api/users/:id
// @desc   User Info
// @access   Private
router.put('/:id', auth, async (req, res) => {
	const { firstName, lastName, birthdate, bio, location, website } = req.body;

	const userfields = {};

	if (firstName) userfields.firstName = firstName;
	if (lastName) userfields.lastName = lastName;
	if (birthdate) userfields.birthdate = birthdate;
	if (bio) userfields.bio = bio;
	if (location) userfields.location = location;
	if (website) userfields.website = website;

	try {
		let user = await User.findById(req.params.id);
		if (!user) return res.status(404).json({ msg: 'User Not Found' });
		if (user._id.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not Authorized' });
		}
		user = await User.findByIdAndUpdate(
			req.params.id,
			{ $set: userfields },
			{ new: true }
		).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
