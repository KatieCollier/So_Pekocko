const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const likeSchema = mongoose.Schema({
    userId: {type: String, required: true, unique: true},
    like: {type: Number, required: true, min: -1, max:1}
});

likeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Likes", likeSchema);