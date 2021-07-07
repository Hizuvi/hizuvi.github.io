import { MongoClient } from "mongodb";

const url = "mongodb://mongo:27017"
const dbName = 'database'

export async function mongo() {
    if (!_client) {
        _client = await MongoClient.connect(url);
    }

    return _client.db(dbName);
};

let _client: MongoClient;