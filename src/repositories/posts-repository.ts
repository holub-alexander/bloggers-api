import { IPost, POSTS } from '../data/posts-data';

const postsRepository = {
  getAllPosts: (): IPost[] => {
    return POSTS;
  },

  getPostById: (id: string): IPost | null => {
    const findPost = POSTS.find((post) => post.id.toString() === id);

    return findPost || null;
  },
};

export default postsRepository;
