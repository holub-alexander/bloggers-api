import { IBlogger } from '../interfaces/blogger';
import bloggersRepository from '../repositories/bloggers-db-repository';

const bloggersService = {
  getAllBloggers: async (): Promise<IBlogger[]> => bloggersRepository.getAllBloggers(),

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
