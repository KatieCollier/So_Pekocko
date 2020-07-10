/* ### Routing logic concerning users ### */

const express = require("express");
const router = express.Router(); /* create a router with the Router method of express */

const userCtrl = require("../controllers/users"); /* import controllers concerning users */

router.post("/signup", userCtrl.signup); /* route for signup */
router.post("/login", userCtrl.login); /* route for login */

module.exports = router; /* export the user routers */