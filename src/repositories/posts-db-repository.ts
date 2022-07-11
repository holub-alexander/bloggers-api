import { IPost } from '../interfaces/post';
import { IFieldError } from '../interfaces/field-error';
import { IPostInput } from '../interfaces/post-input';
import { postsCollection } from '../db/db';
import pagination from '../utils/pagination';
import { IPaginator } from '../interfaces/paginator';
import { WithId } from 'mongodb';

const postsRepository = {
  getAllPosts: async (
    pageNumber: number,
    pageSize: number
  ): Promise<IPaginator<WithId<IPost>[]>> => {
    const posts = await pagination<IPost>(postsCollection, {}, pageNumber, pageSize);

    return posts;
  },

  getPostById: async (id: string): Promise<IPost | null> => {
    const findPost = postsCollection.findOne({ id }, { projection: { _id: 0 } });

    return findPost || null;
  },

  addPost: async (newPost: IPost): Promise<IPost | IFieldError> => {
    await postsCollection.insertOne({ ...newPost, _id: undefined });

    return newPost;
  },

  updatePostById: async (id: string, data: IPostInput, bloggerName: string): Promise<boolean> => {
    const { title = '', shortDescription = '', content = '', bloggerId } = data;
    const post = await postsCollection.updateOne(
      { id },
      { $set: { title, shortDescription, content, bloggerId, bloggerName } }
    );

    return post.matchedCount === 1;
  },

  deletePostById: async (id: string): Promise<boolean> => {
    const deletedPost = await postsCollection.deleteOne({ id });

    return deletedPost.deletedCount === 1;
  },

  getAllBloggerPosts: async (
    bloggerId: number,
    pageNumber: number,
    pageSize: number
  ): Promise<IPaginator<WithId<IPost>[]>> => {
    const posts = await pagination<IPost>(postsCollection, { bloggerId }, pageNumber, pageSize);

    return posts;
  },
};

export default postsRepository;
