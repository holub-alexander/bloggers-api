import { commentsCollection } from '../db/db';
import { IComment } from '../interfaces/comment';
import pagination from '../utils/pagination';

const commentsRepository = {
  addCommentForPost: async (postId: string, data: IComment): Promise<IComment> => {
    await commentsCollection.insertOne({ postId, ...data, _id: undefined });

    return data;
  },

  getAllCommentsForPost: async (postId: string, pageNumber: number, pageSize: number) =>
    pagination<IComment & { postId: string }>(
      commentsCollection,
      { postId },
      pageNumber,
      pageSize,
      { postId: 0, _id: 0 }
    ),
};

export default commentsRepository;
