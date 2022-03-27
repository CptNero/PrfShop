const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {Int32} = require("mongodb");

class Database {
    constructor(url) {
        this.dbUrl = url
    }

    Connect() {
        mongoose.connect(this.dbUrl)

        mongoose.connection.on('connected', () => {
            console.log('Successfully connected to the database.')
        })

        mongoose.connection.on('error', (err) => {
            console.log('Failed to connect to the database: ' + err)
        })
    }

    PopulateModels() {
        const mongoose = require("mongoose");

        const userSchema = new mongoose.Schema(
            {
                email: {type: String, unique: true, required: true, lowercase: true},
                password: {type: String, required: true},
            }, {collection: 'users'}
        );

        userSchema.pre('save', function (next) {
            const user = this;
            if (user.isModified('password')) {
                user.accessLevel = 'basic';
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        return next('Hiba a salt előállítása során')
                    }
                    bcrypt.hash(user.password, salt, function (error, hash) {
                        if (error) {
                            return next('Hiba a hash előállítása során')
                        }
                        user.password = hash;
                        return next();
                    })
                })
            } else { return next() }
        });

        userSchema.methods.comparePasswords = function (password, nx) {
            bcrypt.compare(password, this.password, function (err, isMatch) {
                nx(err, isMatch);
            }); // hasheli a kapott jelszót is és csak a hasheket hasonlítja össze
        }; // minden létrehozott és lekérdezett objektum a users kollekcióból rendelkezni fog ezzel a beépített metódussal

        mongoose.model('user', userSchema);

        const productSchema = new mongoose.Schema(
            {
                name: {type: String, unique: true, required: true},
                price: {type: Number},
                quantity: {type: Number},
            }, {collection: 'products'}
        )

        mongoose.model('product', productSchema)
    }
}


module.exports = Database