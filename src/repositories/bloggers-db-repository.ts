import { WithId } from 'mongodb';
import { bloggersCollection } from '../db/db';
import { IBlogger } from '../interfaces/blogger';
import { IPaginator } from '../interfaces/paginator';
import pagination from '../utils/pagination';
import { SEARCH_NAME_BLOGGER_REGEXP } from '../utils/regexp';

const bloggersRepository = {
  getAllBloggers: async (
    pageNumber: number,
    pageSize: number,
    searchNameTerm?: string
  ): Promise<IPaginator<WithId<IBlogger>[]>> => {
    let bloggers = null;

    if (searchNameTerm) {
      bloggers = await pagination<IBlogger>(
        bloggersCollection,
        { name: { $regex: SEARCH_NAME_BLOGGER_REGEXP(searchNameTerm) } },
        pageNumber,
        pageSize
      );
    } else {
      bloggers = await pagination<IBlogger>(bloggersCollection, {}, pageNumber, pageSize);
    }

    return bloggers;
  },

  getBloggerById: async (id: string): Promise<IBlogger | null> => {
    const findBlogger = bloggersCollection.findOne({ id }, { projection: { _id: 0 } });

    return findBlogger || null;
  },

  addBlogger: async (newBlogger: IBlogger): Promise<IBlogger> => {
    await bloggersCollection.insertOne({ ...newBlogger, _id: undefined });

    return newBlogger;
  },

  updateBloggerById: async (id: string, name: string, youtubeUrl: string): Promise<boolean> => {
    const blogger = await bloggersCollection.updateOne({ id }, { $set: { name, youtubeUrl } });

    return blogger.matchedCount === 1;
  },

  deleteBloggerById: async (id: string): Promise<boolean> => {
    const deletedBlogger = await bloggersCollection.deleteOne({ id });

    return deletedBlogger.deletedCount === 1;
  },
};

export default bloggersRepository;
