import { IPost } from '../interfaces/post';
import { IFieldError } from '../interfaces/field-error';
import { IPostInput } from '../interfaces/post-input';
import postsRepository from '../repositories/posts-db-repository';
import { IPaginator } from '../interfaces/paginator';
import { WithId } from 'mongodb';

const postsService = {
  getAllPosts: async (
    pageNumber: number = 1,
    pageSize: number = 1
  ): Promise<IPaginator<WithId<IPost>[]>> => postsRepository.getAllPosts(pageNumber, pageSize),

  getPostById: async (id: string): Promise<IPost | null> => postsRepository.getPostById(id),

  addPost: async (data: IPostInput, bloggerName: string): Promise<IPost | IFieldError> => {
    const { title, shortDescription, content, bloggerId } = data;
    const newPost: IPost = {
      id: new Date().valueOf(),
      title,
      shortDescription,
      content,
      bloggerId,
      bloggerName,
    };

    const newProduct = postsRepository.addPost(newPost);

    return newProduct;
  },

  updatePostById: async (id: string, data: IPostInput, bloggerName: string): Promise<boolean> =>
    postsRepository.updatePostById(id, data, bloggerName),

  deletePostById: async (id: string): Promise<boolean> => postsRepository.deletePostById(id),
};

export default postsService;
