const { MongoClient } = require('mongodb');

const dbUri ='mongodb+srv://Suri:test1234@logininfo.o5uvzjh.mongodb.net/?retryWrites=true&w=majority';
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