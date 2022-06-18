import { IPost } from '../interfaces/post';
import { IFieldError } from '../interfaces/field-error';
import { IPostInput } from '../interfaces/post-input';
import postsRepository from '../repositories/posts-repository';

const postsService = {
  getAllPosts: (): IPost[] => postsRepository.getAllPosts(),

  getPostById: (id: string): IPost | null => postsRepository.getPostById(id),

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

    return postsRepository.addPost(newPost);
  },

  updatePostById: (id: string, data: IPostInput, bloggerName: string): boolean =>
    postsRepository.updatePostById(id, data, bloggerName),

  deletePostById: (id: string): boolean => postsRepository.deletePostById(id),
};

export default postsService;
