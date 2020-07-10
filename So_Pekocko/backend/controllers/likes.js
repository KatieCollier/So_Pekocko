/* ### Business logic concerning likes ### */

const Sauce = require("../models/sauces"); /* import the schema for sauces */

/* Create and export a function to like or dislike a sauce */
exports.likeSauce = (req, res, next) => {
   Sauce.findOne({_id: req.params.id}) /* find the sauce that is being (dis)liked using the sauce id in the request parameters */
        .then(sauce => {
            const likeArray = sauce.usersLiked; /* get and name the usersLiked array - will contain the ids of all users that liked this sauce */
            const dislikeArray = sauce.usersDisliked; /* get and name the usersDisiked array - will contain the ids of all users that disliked this sauce */
            if(req.body.like == 1){ /* if the user liked the sauce (like = 1)... */
                likeArray.push(req.body.userId); /* ... add the user's id to the likeArray */
            } if(req.body.like == -1) { /*if the user dislikes the sauce ( like = -1) ... */
                dislikeArray.push(req.body.userId); /* ... add the user's id to the dislikeArray */
            } if(req.body.like == 0) { /* if the user no longer likes or dislikes the sauce (like = 0) ... */
                for (let i = 0; i < likeArray.length; i++){ /* ... loop throught the likeArray... */
                    if(likeArray[i] === req.body.userId){ /*... to find the index of the user's id in the array ...*/
                        likeArray.splice(i,1) /*... and use it to remove the user's id from the likeArray*/
                    }
                };
                for (let i = 0; i < dislikeArray.length; i++){ /* ... loop throught the dislikeArray... */
                    if(dislikeArray[i] === req.body.userId){ /*... to find the index of the user's id in the array ...*/
                        dislikeArray.splice(i,1) /*... and use it to remove the user's id from the dislikeArray*/
                    }
                }
            };
            const nbLikes = likeArray.length; /* set the number of likes as the number of user's listed in the likeArray*/
            const nbDislikes = dislikeArray.length; /* set the number of dislikes as the number of user's listed in the dislikeArray*/
            Sauce.updateOne({_id: req.params.id}, { /*update the sauce, found using its id */
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
