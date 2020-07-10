/* ### Create an "express" application ### */

const express = require("express"); /* imports the express package = framework to make creating a server easier*/
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const userRoutes = require("./routes/user"); /* import the user routers and store them in a "userRoutes" object */
const sauceRoutes = require("./routes/sauce");/* import the sauces routers and store them in a "sauceRoutes" object */
const likesRoutes = require("./routes/likes");/* import the likes router and store them in a "likesRoutes" object */

/* connect application to MongoDB database */
mongoose.connect('mongodb+srv://Katie:SpicyChillis@cluster0.1uh07.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); /* create the "express" application */

/* set hearders to avoid CORS errors */
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes); /* for the route defined use the routers in "userRoutes" */
app.use("/api/sauces", sauceRoutes);
app.use("/api/sauces", likesRoutes);

module.exports = app; /* export the application to make it available in files where it has been required */