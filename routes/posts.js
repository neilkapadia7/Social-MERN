const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Post = require("../models/Posts");

// @route   GET    api/posts
// @desc    Get All Post
// @access  Private
router.get("/", auth, async (req, res) => {
	try {
		const posts = await Post.find({ user: req.user.id }).sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route   POST    api/posts
// @desc    Add New Post
// @access  Private
router.post(
	"/",
	[
		auth,
		[
			check("body", "Post is Required").not().isEmpty(),
			check("author", "Author is Required").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		}

		const { body, author } = req.body;

		try {
			const newPost = new Post({
				user: req.user.id,
				body,
				author,
			});

			const post = await newPost.save();

			res.json(post);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
