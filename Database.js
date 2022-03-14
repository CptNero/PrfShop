const MongoClient = require('mongodb')
const mongoose = require('mongoose')

class Database {
    constructor(url) {
        this.dburl = url
    }

    Connect() {
        mongoose.connect(dbUrl)

        mongoose.connection.on('connected', () => {
            console.log('Successfully connected to the database.')
        })

        mongoose.connection.on('error', (err) => {
            console.log('Failed to connect to the database: ' + err)
        })
    }
}


module.exports = Database