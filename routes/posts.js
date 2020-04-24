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

// @route   PUT    api/posts
// @desc    Update Post
// @access  Private
router.put("/:id", auth, async (req, res) => {
	const { body } = req.body;

	const postfields = {};

	if (body) postfields.body = body;

	try {
		let post = await Post.findById(req.params.id);

		if (!post) return res.status(404).json({ msg: "Post Not Found" });

		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Not Authorized" });
		}

		post = await Post.findByIdAndUpdate(
			req.params.id,
			{ $set: postfields },
			{ new: true }
		);

		res.json(post);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route   DELETE    api/posts
// @desc    Delete Post
// @access  Private
router.delete("/:id", auth, async (req, res) => {
	try {
		let post = await Post.findById(req.params.id);

		if (!post) return res.status(404).json({ msg: "Post Not Found" });

		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Not Authorized" });
		}

		await Post.findByIdAndRemove(req.params.id);

		res.json({ msg: "Post Deleted" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route   GET    api/posts/all
// @desc    Get all Posts
// @access  Public
router.get("/all", auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });

		res.json(posts);
	} catch (error) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route   GET    api/posts/user/:id
// @desc    Get user's all Posts
// @access  Public
router.get("/user/:id", auth, async (req, res) => {
	try {
		const post = await Post.find({ user: req.params.id }).sort({ date: -1 });

		res.json(post);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
