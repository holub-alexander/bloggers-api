import { IPost, POSTS } from '../data/posts-data';
import { IFieldError } from '../types/field-error';

const postsRepository = {
  getAllPosts: (): IPost[] => {
    return POSTS;
  },

  getPostById: (id: string): IPost | null => {
    const findPost = POSTS.find((post) => post.id.toString() === id);

    return findPost || null;
  },

  addPost: (
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: number,
    bloggerName: string
  ): IPost | IFieldError => {
    const newPost: IPost = {
      id: new Date().valueOf(),
      title,
      shortDescription,
      content,
      bloggerId,
      bloggerName,
    };

    POSTS.push(newPost);

    return newPost;
  },
};

export default postsRepository;
