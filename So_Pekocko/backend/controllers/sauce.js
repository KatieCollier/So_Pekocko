const Sauce = require("../models/sauces");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(() => res.status(201).json({message: "Nouvelle sauce piquante enrgistrée"}))
        .catch(error => res.status(400).json({error}));
};

/*
exports.getSauces = (req, res, next) => {

};

exports.getOneSauce = (req, res, next) => {

};

exports.modifySauce = (req, res, next) => {

};

exports.deletSauce = (req, res, next) => {

};*/