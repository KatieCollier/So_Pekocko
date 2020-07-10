/* ### Routing logic concerning sauces ### */

const express = require("express");
const router = express.Router(); /* create a router with the Router method of express */

const sauceCtrl = require("../controllers/sauce"); /* import controllers concerning sauces */
const auth = require("../middleware/auth"); /* import authentication middleware to protect paths */
const multer = require("../middleware/multer-config"); /* import multer middleware to handle importing files */

router.post("/", auth, multer, sauceCtrl.createSauce); /* route to create a sauce */
router.put("/:id", auth, multer, sauceCtrl.modifySauce); /* route to modify a sauce */
router.delete("/:id", auth, sauceCtrl.deleteSauce); /* route to delete a sauce */
router.get("/:id", auth, sauceCtrl.getOneSauce); /* route to see information on one specific sauce */
router.get("/", auth, sauceCtrl.getSauces); /* route to see information on all sauces */

module.exports = router; /* export the sauces routers */