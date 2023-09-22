const { MongoClient } = require('mongodb');
let cachedClient = null;
let cachedDb = null;

const connectToMongo = async () => {
    if (cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    const MONGO_URI = process.env.MONGO_URI;

    console.log(MONGO_URI);

    const MONGODB_DB = "stock-analysis-tool-1011";

    let client = new MongoClient(MONGO_URI);
    await client.connect();

    let db = client.db(MONGODB_DB);

    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}

export default connectToMongo;