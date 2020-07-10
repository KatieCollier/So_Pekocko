/* ### Routing logic concerning likes ### */

const express = require("express");
const router = express.Router(); /* create a router with the Router method of express */

const likesCtrl = require("../controllers/likes"); /* import controllers concerning likes */
const auth = require("../middleware/auth"); /* import authentication middleware to protect paths */

router.post("/:id/like", auth, likesCtrl.likeSauce); /* route for likes and dislikes */

module.exports = router;/* export the likes router */