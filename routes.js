const router = require('express').Router()

const mongoose = require('mongoose')
const userModel = mongoose.model('user')
const productModel = mongoose.model('product')

const passport = require('passport')

router.route('/').get((req, res, next) => {
  return res.status(200).send("Api server works!")
})

router.route('/register').post((req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    console.log('register')

    if (email, password) {
        const user = new userModel({email, password})
        user.save((error => {
            if (error) {
                console.log("Failed to save user: ", error)
            }
        }))
    }
})

router.route('/login').post((req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    if (!(email && password)) {
        return res.status(400).send("Email and password is required!")
    }

    console.log('Email and password got here')

    passport.authenticate('local', {}, (error, user, info) => {
        if (error) return  res.status(400).send(error)

        req.logIn(user, (error) => {
            if (error) return res.status(500).send(error);
            console.log('Successful login')
            return res.status(200).send(user)
        })
    })(req, res, next);
})

router.route('/logout').post((req, res, next) => {
    if(req.isAuthenticated()) {
        req.logout();
        console.log('Log out succesfull')
        return res.status(200).send('Log out successful');
    } else {
        return res.status(403).send('User is not logged in.');
    }
})

router.route('/products/:id?')
    .post((req, res, next) => {
    const name = req.body.name
    const price = req.body.price || 0
    const quantity = req.body.quantity || 0

    if (name) {
        const product = new productModel({name, price, quantity})
        product.save((error => {
            if (error) {
                console.log(error)
                res.status(400).send(error)
            }
            res.status(200).send(product)
        }))
    }
    console.log('Added product')
})
    .get((req, res, next) => {
        productModel.find((error, products) => {
            if (error) {
                return res.status(400).send(error)
            }

            return res.status(200).send(products)
        })
        console.log('Queried products')
    })
    .delete((req, res, next) => {
        const id = req.params.id
        if (id) {
            productModel.deleteOne({name: id}, (err) => {
                if (err) {
                    return res.status(400).send(err)
                }
                return res.status(200).send(id)
            })
            console.log('Deleted product')
        }
    })

module.exports = router