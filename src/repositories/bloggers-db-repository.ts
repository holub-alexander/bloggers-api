import { bloggersCollection } from '../db/db';
import { IBlogger } from '../interfaces/blogger';

const bloggersRepository = {
  getAllBloggers: async (): Promise<IBlogger[]> => {
    const bloggers = await bloggersCollection.find({}, { projection: { _id: 0 } }).toArray();

    return bloggers;
  },

  getBloggerById: async (id: string): Promise<IBlogger | null> => {
    const findBlogger = await bloggersCollection.findOne({ id: +id }, { projection: { _id: 0 } });

    return findBlogger || null;
  },

  addBlogger: async (newBlogger: IBlogger): Promise<IBlogger> => {
    await bloggersCollection.insertOne({ ...newBlogger, _id: undefined });

    return newBlogger;
  },

  updateBloggerById: async (id: string, name: string, youtubeUrl: string): Promise<boolean> => {
    const blogger = await bloggersCollection.updateOne({ id: +id }, { $set: { name, youtubeUrl } });

    return blogger.modifiedCount === 1;
  },

  deleteBloggerById: async (id: string): Promise<boolean> => {
    const deletedBlogger = await bloggersCollection.deleteOne({ id: +id });

    return deletedBlogger.deletedCount === 1;
  },
};

export default bloggersRepository;
