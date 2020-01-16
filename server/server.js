let express = require('express');
let cors = require('cors');
let connDashB = require('./db/dashbordConnection');
let db = require('./db/databaseConnection');
let widget = require('./db/widget');
let bodyParser = require("body-parser");
let weather = require('./api/weather/weather');
let searchCocktail = require('./api/cocktails/searchCocktail');
let searchIngredients = require('./api/cocktails/searchIngredients');
let pokedex = require('./api/pokemon/pokemon');
let pokeTypes = require('./api/pokemon/types');
let parking = require('./api/strasbourg/parking');
let about = require('./utils/about')
let passport = require('passport');
let Strategy = require('passport-twitter').Strategy;
let session = require('express-session');
let config = require('./utils/config');
let oauth = require('./db/oauth');

passport.use(new Strategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: 'http://localhost:8080/twitter/return'
}, function(token, tokenSecret, profile, callback) {
    return callback(null, profile);
}));

passport.serializeUser(function(user, callback) {
    callback(null, user);
})

passport.deserializeUser(function(obj, callback) {
    callback(null, obj);
})

let app = express();
let router = express.Router();
let port = process.env.HOST_PORT;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    req.ip = req.headers['x-forwarded-for'] || req.ip.slice(7);
    if (req.ip.length === "")
        req.ip = "127.0.0.1";
    next();
});
app.use(session({ secret: 'whatever', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

router.route('/login')
    .post(db.connDataB, connDashB.connectUser)

router.route('/users')
    .post(db.connDataB, connDashB.createUser)

router.route('/widget/create')
    .post(db.connDataB, db.decodeJWToken, widget.createWidget)

router.route('/widget/update')
    .post(db.connDataB, db.decodeJWToken, widget.updateWidget)

router.route('/widget/delete')
    .post(db.connDataB, db.decodeJWToken, widget.deleteWidget)

router.route('/widget/up')
    .post(db.connDataB, db.decodeJWToken, widget.moveUpWidget)

router.route('/widget/down')
    .post(db.connDataB, db.decodeJWToken, widget.moveDownWidget)

router.route('/widgets')
    .get(db.connDataB, db.decodeJWToken, widget.getWidgets)

router.route('/weather/:city')
    .get(db.decodeJWToken, weather.getWeatherAt);

router.route('/cocktail/searchCocktail/:cocktail')
    .get(db.decodeJWToken, searchCocktail.searchCocktail);

router.route('/cocktail/searchIngredients/:ingredient/:qty')
    .get(db.decodeJWToken, searchIngredients.searchIngredients);

router.route('/pokemon/pokedex/:pokemon')
    .get(db.decodeJWToken, pokedex.searchPokemon);

router.route('/pokemon/types/:type')
    .get(db.decodeJWToken, pokeTypes.searchTypes);

router.route('/parking/:parking')
    .get(db.decodeJWToken, parking.searchParking);

router.route('/about.json')
    .get(about.about);

router.route('/twitter/login')
    .get(passport.authenticate('twitter'))

router.route('/twitter/return')
    .post(db.connDataB, db.decodeJWToken, oauth.oauthReturn);

app.use(router);

app.listen(port, () => {
    console.log("Listen on port:" + port);
});