const express = require("express")
const app = express();
const session = require('express-session');
const passport = require("passport");
const passportSetup = require("./config/passport-setup.js");

const port = 4000;

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla' 
}));

app.use(passport.initialize());

app.get("/auth/discord", passport.authenticate("discord", { permissions: 8 }))
app.get("/auth/discord/callback", passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect("http://localhost:3000/")
});

app.listen(port, () => console.log(`Server is running on port ${port}`))