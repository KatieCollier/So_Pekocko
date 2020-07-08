const bcrypt = require("bcrypt");
const jst = require("jsonwebtoken");

const User = require("../models/users");

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
            .then(() => res.status(201).json({message: "Utilisateur créé !"}))
            .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                res.staus(401).json({error: "Utilisateur non trouvé !"})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid){
                        res.status(401).json({error: "Mot de passe incorrecte !"});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jst.sign(
                            {userId: user._id},
                            "RANDOM_SECRET_TOKEN",
                            {expiresIn: "24h"}
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};