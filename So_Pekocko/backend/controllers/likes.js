const Likes = require("../models/likes");
const Sauce = require("../models/sauces");
const users = require("../models/users");
const { json } = require("body-parser");




exports.likeSauce = (req, res, next) => {
   Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            console.log(sauce.name)
            const array = sauce.usersLiked;
            if(req.body.like == 1){
                array.push(req.body.userId)
            } else {
                array.pop(req.body.userId)
            };
            const nbLikes = array.length;
            console.log(array); 
            console.log(nbLikes); 
            Sauce.updateOne({_id: req.params.id}, {
                usersLiked: array,
                likes: nbLikes,
                _id: req.params.id
            })
                .then(likedsauce => res.status(200).json(likedsauce))
                .catch(error => res.status(400).json({error}));
            res.status(200).json(sauce)          
        })
        .catch(error => res.status(400).json({error}));
};

/*
if(req.body.like == 1){
    usersLiked.push(userId)
}
if(req.body.like == -1){
    usersDisliked.push(userId)
}
if(req.body.like == 0){
    usersDisliked.pop(userId);
    usersDisliked.pop(userId)
}
likes = length(usersLiked);
dislikes = length(usersDisliked);*/
