"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
console.log("Started");
const url = "mongodb://mongo:27017";
const dbName = 'database';
mongodb_1.MongoClient.connect(url, (err, client) => {
    if (err)
        throw err;
    else {
        const db = client.db(dbName);
        console.log("Connected!");
        client.close();
        return db;
    }
});
