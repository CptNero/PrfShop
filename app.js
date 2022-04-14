const express = require('express')
const cors = require('cors')
const passport = require('passport')
const app = express()
const Database = require('./Database')
const mongoose = require("mongoose");
const db = new Database('mongodb+srv://CptNero:100%25MongoJuice@cluster0.zlbwt.mongodb.net/Cluster0?retryWrites=true&w=majority')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

db.Connect()
db.PopulateModels()

const userModel = mongoose.model('user')

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))
app.use(session({secret: 'asdasdds', resave: true, saveUninitialized: true}))
app.use(passport.initialize({}))
app.use(passport.session({}))

passport.use('local', new LocalStrategy({usernameField: 'email'}, function (email, password, done) {
    userModel.findOne({ email: email }, function (err, user) {
        if (err) return done('Error during query.', null);
        if (!user) return done('User does not exist', null);

        user.comparePasswords(password, function (error, isMatch) {
            if (error) return done(error, false);
            if (!isMatch) return done('Incorrect password.', false);
            return done(null, user);
        })
    })
}));

passport.serializeUser((user, done) => {
    if (user) done(null, user);
})

passport.deserializeUser((id, done) => {
    done(null, id);
})

app.use('/', require('./routes'))

app.listen(3000, () => {
    console.log('The server is running on port 3000.')
})