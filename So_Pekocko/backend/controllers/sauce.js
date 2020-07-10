/* ### Business logic concerning sauces ### */

const Sauce = require("../models/sauces"); /* import the schema for sauces */
const fs = require("fs");

/* create and export a function to create a new sauce */
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); /* get information for request body */
    delete sauceObject._id; /* delete the id from the request body - a new one will automatically be created by mongoose*/
    const sauce = new Sauce({ /*create new sauce object ...*/
        ...sauceObject, /* .. using the request information */
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`, /* ...create image url */
        likes: 0, /* ... set the likes and dislikes at 0 */
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save() /* save sauce to database */
        .then(() => res.status(201).json({message: "Nouvelle sauce piquante enrgistrée"}))
        .catch(error => res.status(400).json({error}));
};

/* create and export a function to get information on all sauces */
exports.getSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
};

/* create and export a function to get information on one specific sauce */
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}) /* find sauce using its id */
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}));
};

/* create and export a function to modify a sauce */
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    }: {...req.body};
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
    .then(() => res.status(200).json({message: "Sauce mise à jour"}))
    .catch(error => res.status(400).json({error}));
};

/* create and export a function to delete a sauce */
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}) /* find sauce using its id */
        .then(sauce => {
            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => { /* delete the image */
                Sauce.deleteOne({_id: req.params.id}) /* delete the sauce using its id to identify it */ 
                    .then(() => res.status(200).json({message: "Sauce supprimée"}))
                    .catch(error => res.status(400).json({error}));
            })
        })
        .catch(error => res.status(500).json({error}));
};