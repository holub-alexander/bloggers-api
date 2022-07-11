import { IComment } from '../interfaces/comment';
import commentsRepository from '../repositories/comments-db-repository';

const commentsService = {
  addCommentForPost: async (
    postId: string,
    data: { content: string; userId: string; userLogin: string }
  ): Promise<IComment> => {
    const { content, userId, userLogin } = data;

    const newComment: IComment = {
      id: new Date().valueOf().toString(),
      content,
      userId,
      userLogin,
      addedAt: new Date().toISOString(),
    };

    await commentsRepository.addCommentForPost(postId, newComment);

    return newComment;
  },

  getAllCommentsForPost: async (postId: string, pageNumber: number, pageSize: number) =>
    commentsRepository.getAllCommentsForPost(postId, pageNumber, pageSize),
};

export default commentsService;
