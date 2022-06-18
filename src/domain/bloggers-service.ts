import { IBlogger } from '../interfaces/blogger';
import bloggersRepository from '../repositories/bloggers-repository';

const bloggersService = {
  getAllBloggers: (): IBlogger[] => bloggersRepository.getAllBloggers(),

  getBloggerById: (id: string): IBlogger | null => bloggersRepository.getBloggerById(id),

  addBlogger: (name: string, youtubeUrl: string): IBlogger => {
    const newBlogger = {
      id: new Date().valueOf(),
      name,
      youtubeUrl,
    };

    return bloggersRepository.addBlogger(newBlogger);
  },

  updateBloggerById: (id: string, name: string, youtubeUrl: string): boolean =>
    bloggersRepository.updateBloggerById(id, name, youtubeUrl),

  deleteBloggerById: (id: string): boolean => bloggersRepository.deleteBloggerById(id),
};

export default bloggersService;
