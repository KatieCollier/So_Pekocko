/* ### Business logic concerning users ### */

const bcrypt = require("bcrypt"); /* import the "bcrypt" package that unidirectionnaly encodes a string and return a hash */
const jst = require("jsonwebtoken"); /* import jsonwetoken necessary to create a token for authentication */

const User = require("../models/users"); /* import the schema for users */

/* create and export a function to create a new user (sign up) */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) /* create a hash from the password (encrypt it) */
    .then(hash => {
        const user = new User({
            email: req.body.email, /* set the email from the information provided by the user in the request */
            password: hash /* set the password as the encrypted hash */
        });
        user.save() /* save the new user */
            .then(() => res.status(201).json({message: "Utilisateur créé !"}))
            .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

/* create and export a function to login */
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email}) /* find the user with the email corresponding to the email provided in the body of the request */
        .then(user => {
            if(!user){ /* if this user does NOT exist, return an error */
                res.staus(401).json({error: "Utilisateur non trouvé !"})
            }
            bcrypt.compare(req.body.password, user.password) /* if the user DOES exist, compare the password in the request to the (encrypted) password stored in the database */
                .then(valid => {
                    if(!valid){ /* if these passwords do NOT match, return an error */
                        res.status(401).json({error: "Mot de passe incorrecte !"});
                    }
                    res.status(200).json({ /* if the passwords DO match: */
                        userId: user._id,
                        token: jst.sign( /* give the user a token necessary for authentication and use of the app */
                            {userId: user._id},
                            "RANDOM_SECRET_TOKEN",
                            {expiresIn: "24h"} /* this token expires in 24h as a security precaution */
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};