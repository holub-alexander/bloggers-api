import { WithId } from 'mongodb';
import { IBlogger } from '../interfaces/blogger';
import { IPaginator } from '../interfaces/paginator';
import bloggersRepository from '../repositories/bloggers-db-repository';

const bloggersService = {
  getAllBloggers: async (
    pageNumber: number,
    pageSize: number,
    searchNameTerm?: string
  ): Promise<IPaginator<WithId<IBlogger>[]>> =>
    bloggersRepository.getAllBloggers(pageNumber, pageSize, searchNameTerm),

  getBloggerById: async (id: string): Promise<IBlogger | null> =>
    bloggersRepository.getBloggerById(id),

  addBlogger: async (name: string, youtubeUrl: string): Promise<IBlogger> => {
    const newBlogger = {
      id: new Date().valueOf(),
      name,
      youtubeUrl,
    };

    const result = bloggersRepository.addBlogger(newBlogger);

    return result;
  },

  updateBloggerById: async (id: string, name: string, youtubeUrl: string): Promise<boolean> =>
    bloggersRepository.updateBloggerById(id, name, youtubeUrl),

  deleteBloggerById: async (id: string): Promise<boolean> =>
    bloggersRepository.deleteBloggerById(id),
};

export default bloggersService;
