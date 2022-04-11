import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// check the MongoDB URI
if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
}

// check the MongoDB DB
if (!MONGODB_DB) {
    throw new Error('Define the MONGODB_DB environmental variable');
}

async function connect() {
    /*if (!client.isConnected())*/ await client.connect();
    const db = client.db(MONGODB_DB);
    return { db, client };
}

export { connect };