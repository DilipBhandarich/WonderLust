const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLogedIn,isReviewAuthor } = require("../middleware.js");
const  reviewController  = require("../controllers/review.js");

//Post Route
router.post("/",isLogedIn,validateReview,wrapAsync(reviewController.createReview));

router.delete("/:reviewId",isLogedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;