import { IPost, POSTS } from '../data/posts-data';
import { IFieldError } from '../types/field-error';
import { IPostInput } from '../types/post-input';

const postsRepository = {
  getAllPosts: (): IPost[] => {
    return POSTS;
  },

  getPostById: (id: string): IPost | null => {
    const findPost = POSTS.find((post) => post.id.toString() === id);

    return findPost || null;
  },

  addPost: (data: IPostInput, bloggerName: string): IPost | IFieldError => {
    const { title, shortDescription, content, bloggerId } = data;

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

  updatePostById: (id: string, data: IPostInput, bloggerName: string): boolean => {
    const { title, shortDescription, content, bloggerId } = data;
    const post = POSTS.find((post) => post.id.toString() === id);

    if (post) {
      post.title = title;
      post.shortDescription = shortDescription;
      post.content = content;
      post.bloggerId = bloggerId;
      post.bloggerName = bloggerName;

      return true;
    }

    return false;
  },

  deletePostById: (id: string): boolean => {
    const index = POSTS.findIndex((post) => post.id.toString() === id);

    if (index > -1) {
      POSTS.splice(index, 1);

      return true;
    }

    return false;
  },
};

export default postsRepository;
