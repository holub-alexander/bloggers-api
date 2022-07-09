import { MongoClient } from 'mongodb';
import { IBlogger } from '../interfaces/blogger';
import { IPost } from '../interfaces/post';
import { IUser } from '../interfaces/user';

const username = encodeURIComponent('alexander_holub');
const password = encodeURIComponent('za-123-6');
const cluster = 'cluster0.1r5pvba.mongodb.net';

const mongoUrl =
  process.env.mongoUrl || `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true`; // mongodb://0.0.0.0:27017

export const client = new MongoClient(mongoUrl);

export const db = client.db('bloggersData');
export const bloggersCollection = db.collection<IBlogger>('bloggers');
export const postsCollection = db.collection<IPost>('posts');
export const usersCollection = db.collection<IUser>('users');

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
