const Likes = require("../models/likes");
const Sauce = require("../models/sauces");

exports.likeSauce = (req, res, next) => {
   Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            console.log(sauce.name)
            const likeArray = sauce.usersLiked;
            const dislikeArray = sauce.usersDisliked;
            if(req.body.like == 1){
                likeArray.push(req.body.userId);
            } if(req.body.like == -1) {
                dislikeArray.push(req.body.userId);
            } if(req.body.like == 0) {
                for (let i = 0; i < likeArray.length; i++){
                    if(likeArray[i] === req.body.userId){
                        likeArray.splice(i,1)
                    }
                };
                for (let i = 0; i < dislikeArray.length; i++){
                    if(dislikeArray[i] === req.body.userId){
                        dislikeArray.splice(i,1)
                    }
                }
            };
            const nbLikes = likeArray.length;
            const nbDislikes = dislikeArray.length;
            console.log(likeArray); 
            console.log("number of likes; ", nbLikes); 
            console.log(dislikeArray); 
            console.log("number of dislikes; ", nbDislikes);
            Sauce.updateOne({_id: req.params.id}, {
                usersLiked: likeArray,
                likes: nbLikes,
                usersDisliked: dislikeArray,
                dislikes: nbDislikes,
                _id: req.params.id
            })
                .then(likedsauce => res.status(200).json(likedsauce))
                .catch(error => res.status(400).json({error}));
            res.status(200).json(sauce)          
        })
        .catch(error => res.status(400).json({error}));
};
