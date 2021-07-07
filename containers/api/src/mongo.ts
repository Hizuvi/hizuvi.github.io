import { MongoClient } from "mongodb";
console.log("Started")

const url = "mongodb://mongo:27017"
const dbName = 'database'

MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    else {
        const db = client.db(dbName)
        console.log("Connected!");

        client.close()
        return db;
    }
});