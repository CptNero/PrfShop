const express = require('express')
const req = require('express/lib/request')
const app = express()
const Database = require('./Database')
const db = new Database('\'mongodb+srv://CptNero:100%MongoJuice@cluster0.zlbwt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority\'')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

db.Connect()

app.use('/proba', (req, res) => {
    console.log(req.body.gyakvezer)
    console.log(req.body['ora'])
    res.status(200).send('OK')
})

app.use('/', require('./routes'))
app.use('/ezegymasikroute', require('./routes'))

app.listen(3000, () => {
    console.log('A szerver fut')
})