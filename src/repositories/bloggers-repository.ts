import { BLOGGERS, IBlogger } from '../data/bloggers-data';

const bloggersRepository = {
  getAllBloggers: (): IBlogger[] => {
    return BLOGGERS;
  },
  getBloggerById: (id: string): IBlogger | null => {
    const findBlogger = BLOGGERS.find((blogger) => blogger.id.toString() === id);

    return findBlogger || null;
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
