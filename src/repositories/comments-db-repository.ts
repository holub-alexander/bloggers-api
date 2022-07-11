import { WithId } from 'mongodb';
import { commentsCollection } from '../db/db';
import { IComment } from '../interfaces/comment';
import { IPaginator } from '../interfaces/paginator';
import pagination from '../utils/pagination';

const commentsRepository = {
  addCommentForPost: async (postId: string, data: IComment): Promise<IComment> => {
    await commentsCollection.insertOne({ postId, ...data, _id: undefined });

    return data;
  },

  getAllCommentsForPost: async (
    postId: string,
    pageNumber: number,
    pageSize: number
  ): Promise<
    IPaginator<
      WithId<
        IComment & {
          postId: string;
        }
      >[]
    >
  > =>
    pagination<IComment & { postId: string }>(
      commentsCollection,
      { postId },
      pageNumber,
      pageSize,
      {
        postId: 0,
        _id: 0,
      }
    ),

  getCommentById: async (id: string) => {
    const findComment = commentsCollection.findOne({ id }, { projection: { _id: 0, postId: 0 } });

    return findComment || null;
  },

  deleteCommentById: async (commentId: string, userId: string): Promise<number> => {
    const findComment = await commentsRepository.getCommentById(commentId);

    if (!findComment) {
      return 0;
    }

    if (findComment && findComment.userId === userId) {
      await commentsCollection.deleteOne({ id: commentId });

      return 1;
    }

    return -1;
  },

  updateCommentById: async (
    commentId: string,
    content: string,
    userId: string
  ): Promise<number> => {
    const findComment = await commentsRepository.getCommentById(commentId);

    console.log(findComment);

    if (!findComment) {
      return 0;
    }

    if (findComment && findComment.userId === userId) {
      const comment = await commentsCollection.updateOne({ id: commentId }, { $set: { content } });

      return comment.matchedCount === 1 ? 1 : 0;
    }

    return -1;
  },
};

export default commentsRepository;
