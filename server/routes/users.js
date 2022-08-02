const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
//UPDATE

router.put("/:id", verify, async (req, res) => {
	if (req.user.id === req.params.id || req.user.isAdmin) {
		if (req.body.password) {
			req.body.password = CryptoJS.AES.encrypt(
				req.body.password,
				process.env.SECRET_KEY
			).toString();
		}

		try {
			const updatedUser = await User.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(200).json(updatedUser);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You can update only your account!");
	}
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
	if (req.user.id === req.params.id || req.user.isAdmin) {
		try {
			await User.findByIdAndDelete(req.params.id);
			res.status(200).json("User has been deleted...");
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You can delete only your account!");
	}
});

//GET

router.get("/find/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, ...info } = user._doc;
		res.status(200).json(info);
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET ALL
router.get("/", verify, async (req, res) => {
	const query = req.query;
	if (req.user.isAdmin) {
		try {
			const users = query
				? await User.find().sort({ _id: -1 }).limit(5)
				: await User.find()
			res.status(200).json(users);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You are not allowed to see all users!")
	}
});

//GET USER STATS
router.get("/stats", async (req, res) => {
	const today = new Date();
	const latYear = today.setFullYear(today.setFullYear() - 1);

	try {
		const data = await User.aggregate([
			{
				$project: {
					month: { $month: "$createdAt" },
				},
			},
			{
				$group: {
					_id: "$month",
					total: { $sum: 1 },
				},
			},
		]);
		res.status(200).json(data)
	} catch (err) {
		res.status(500).json(err);
	}
});

// Add total money

router.put("/total/:id", async (req, res) => {

	try {
		const id = req.params.id;
		const newTotal = req.body.total
		const options = { new: true }

		const search = await User.findById(id)
		const oldTotal = +search.total
		const result = await User.findByIdAndUpdate(id, { total: newTotal + oldTotal }, options)

		res.status(200).json(result)

	} catch (error) {
		res.status(500).json(error);
	}
})

// UPDATE Favorite

router.put("/favorite/:id", async (req, res) => {
	try {

		const id = req.params.id;
		const user = await User.findById(id)
		const isFavorite = req.body.isFavorite
		const oldFavorite = user.favourites

		if (isFavorite) {
			if (oldFavorite.includes(req.body.favorites)) {
				res.status(500).json('Movie already exists in the list')
			} else {

				const result = await User.findByIdAndUpdate(id, { favourites: [...oldFavorite, req.body.favorites] }, { new: true });

				res.status(200).json(result)
			}
		} else {
			if (!oldFavorite.includes(req.body.favorites)) {
				res.status(500).json('Movie does not exist in the list')
			} else {
				const newFavorite = oldFavorite.filter(i => i !== req.body.favorites)
				const result = await User.findByIdAndUpdate(id, { favourites: [...newFavorite] }, { new: true });

				res.status(200).json(result)
			}
		}
	} catch (err) {
		res.status(500).json(err);
	}
})

// CheckOut Netflix

router.put("/checkout/:id", async (req, res) => {

	try {

		const id = req.params.id;
		const user = await User.findById(id);
		const { price, isMember } = req.body;
		const oldPrice = user.total

		if (isMember === true) {
			res.status(500).json({message : "You are Member of Netflix!"});
		} else {
			if (+price > +oldPrice) {
				res.status(500).json({message : "You not enough to buy this package!"});
			} else {
				const newPrice = +oldPrice - +price
				const result = await User.findByIdAndUpdate(id, { total: newPrice, isMember: true }, { new: true });
				res.status(200).json(result)
			}
		}
	} catch (err) {
		res.status(500).json(err);
	}
})

module.exports = router;
