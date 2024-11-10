import { MongoClient, Db, Collection } from 'mongodb';

const mongoUri = 'mongodb://192.168.8.124:27017/';
const dbName = 'Helakuru';
const collectionName = 'esana_news';

export async function connectToMongo(): Promise<{ client: MongoClient; db: Db; collection: Collection }> {
    const client = new MongoClient(mongoUri);
    await client.connect();
    console.log('Connected successfully to MongoDB');
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    return { client, db, collection };
}
