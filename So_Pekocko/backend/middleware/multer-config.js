/* ### Create multer middleware to allow us to import files ### */

const multer = require("multer"); /* import multer package */

const MIME_TYPES = { /* the mime type dictionary will be used to give the file the correct extension */
    "images/jpg": "jpg",
    "images/jpeg": "jpg",
    "images/png": "png"
};

const storage = multer.diskStorage({ /* storage indicates to multer where to save the files */
    destination: (req, file, callback) => { /* save files in "images" directory */
        callback(null, "images")
    },
    filename: (req, file, callback) => { /* creates a unique filename for the file using its original filename and the time stamp */
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    }
});

module.exports = multer({storage: storage}).single("image"); /* export multer middleware */