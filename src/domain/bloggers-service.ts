import { IBlogger } from '../interfaces/blogger';
import bloggersRepository from '../repositories/bloggers-db-repository';

const bloggersService = {
  getAllBloggers: async (): Promise<IBlogger[]> => await bloggersRepository.getAllBloggers(),

  getBloggerById: async (id: string): Promise<IBlogger | null> =>
    await bloggersRepository.getBloggerById(id),

  addBlogger: async (name: string, youtubeUrl: string): Promise<IBlogger> => {
    const newBlogger = {
      id: new Date().valueOf(),
      name,
      youtubeUrl,
    };

    const result = await bloggersRepository.addBlogger(newBlogger);

    return result;
  },

  updateBloggerById: async (id: string, name: string, youtubeUrl: string): Promise<boolean> =>
    await bloggersRepository.updateBloggerById(id, name, youtubeUrl),

  deleteBloggerById: async (id: string): Promise<boolean> =>
    await bloggersRepository.deleteBloggerById(id),
};

export default bloggersService;
