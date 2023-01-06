const { MongoClient } = require('mongodb');

const dbUri = process.env.SECRET_KEY;
let dbConnection;

module.exports = {
    connectToDB : (cb) => {
        MongoClient.connect(dbUri) // Promise
        .then((client) => {
            dbConnection = client.db();
            return cb();
        })
        .catch((err) =>{
            console.log(err);
            return cb(err);
        })
    },
    getDB : () => dbConnection
}