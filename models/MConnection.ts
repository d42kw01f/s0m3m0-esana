import { MongoClient, Db, Collection } from 'mongodb';

const mongoUri = 'mongodb://192.168.1.4:27017/';
const dbName = 'esana_scraper';
const collectionName = 'news_articles';

export async function connectToMongo(): Promise<{ client: MongoClient; db: Db; collection: Collection }> {
    const client = new MongoClient(mongoUri);
    await client.connect();
    console.log('Connected successfully to MongoDB');
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    return { client, db, collection };
}
