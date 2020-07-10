/* ### Create a schema (model) for sauces ### */

const mongoose = require("mongoose"); /* import "mongoose" package - allows use to create a strict schema with the requires fields and their type */

const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true, min: 1, max: 10},
    likes: {type: Number, required: true, min: 0},
    dislikes: {type: Number, required: true, min: 0},
    usersLiked: {type: [String], required: true},
    usersDisliked: {type: [String], required: true},
});

module.exports = mongoose.model("Sauce", sauceSchema); /* exports the sauces model */