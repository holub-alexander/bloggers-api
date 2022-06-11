import { BLOGGERS, IBlogger } from '../data/bloggers-data';

const bloggersRepository = {
  getAllBloggers: (): IBlogger[] => {
    return BLOGGERS;
  },

  getBloggerById: (id: string): IBlogger | null => {
    const findBlogger = BLOGGERS.find((blogger) => blogger.id.toString() === id);

    return findBlogger || null;
  },

  addBlogger: (name: string, youtubeUrl: string): IBlogger => {
    const newBlogger = {
      id: new Date().valueOf(),
      name,
      youtubeUrl,
    };

    BLOGGERS.push(newBlogger);

    return newBlogger;
  },

  deleteBloggerById: (id: string): boolean => {
    const index = BLOGGERS.findIndex((blogger) => blogger.id.toString() === id);

    if (index > -1) {
      BLOGGERS.splice(index, 1);

      return true;
    }

    return false;
  },
};

export default bloggersRepository;
