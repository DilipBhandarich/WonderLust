const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLogedIn, isOwner } = require("../middleware.js");
const { validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const {storage} = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });

//Index Route and Create Route
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLogedIn,upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing));

//New Route
router.get("/new",isLogedIn,listingController.renderNewForm);

//Show Route ,update Route and Delete Route
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLogedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLogedIn,isOwner,wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit",isLogedIn,isOwner,wrapAsync(listingController.renderEditForm));


// //Show Route
// router.get("/:id",wrapAsync(async(req,res)=>{
//     let {id} = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/show.ejs",{listing});
// }));

module.exports = router;