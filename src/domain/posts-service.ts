import { IPost } from '../interfaces/post';
import { IFieldError } from '../interfaces/field-error';
import { IPostInput } from '../interfaces/post-input';
import postsRepository from '../repositories/posts-db-repository';
import { IPaginator } from '../interfaces/paginator';
import { WithId } from 'mongodb';
import { IComment } from '../interfaces/comment';

const postsService = {
  getAllPosts: async (pageNumber: number, pageSize: number): Promise<IPaginator<WithId<IPost>[]>> =>
    postsRepository.getAllPosts(pageNumber, pageSize),

  getPostById: async (id: string): Promise<IPost | null> => postsRepository.getPostById(id),

  addPost: async (data: IPostInput, bloggerName: string): Promise<IPost | IFieldError> => {
    const { title, shortDescription, content, bloggerId } = data;
    const newPost: IPost = {
      id: new Date().valueOf().toString(),
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

  getAllBloggerPosts: async (
    bloggerId: number,
    pageNumber: number,
    pageSize: number
  ): Promise<IPaginator<WithId<IPost>[]>> =>
    postsRepository.getAllBloggerPosts(bloggerId, pageNumber, pageSize),

  addCommentForPost: async (
    postId: string,
    data: { content: string; userId: string; userLogin: string }
  ): Promise<IComment | null> => {
    const { content, userId, userLogin } = data;

    const newComment: IComment = {
      id: new Date().valueOf().toString(),
      content,
      userId,
      userLogin,
      addedAt: new Date().toISOString(),
    };

    const res = await postsRepository.addCommentForPost(postId, newComment);

    if (res.value) {
      return newComment;
    }

    return null;
  },
};

export default postsService;
