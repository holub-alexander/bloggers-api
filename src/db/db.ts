import { MongoClient } from 'mongodb';
import { IBlogger } from '../interfaces/blogger';

const mongoUrl = process.env.mongoUrl || 'mongodb://0.0.0.0:27017';

export const client = new MongoClient(mongoUrl);

export const db = client.db('bloggersData');
export const bloggersCollection = db.collection<IBlogger>('bloggers');

export async function runDb() {
  try {
    await client.connect();
    await client.db('bloggersData').command({ ping: 1 });

    console.log('Connected successfully to mongo server');
  } catch (err) {
    await client.close();

    console.log('Error mongo server', err);
  }
}
