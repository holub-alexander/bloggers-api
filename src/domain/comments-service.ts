import { WithId } from 'mongodb';
import { IComment } from '../interfaces/comment';
import { IPaginator } from '../interfaces/paginator';
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
  > => commentsRepository.getAllCommentsForPost(postId, pageNumber, pageSize),

  getCommentById: async (
    id: string
  ): Promise<WithId<
    IComment & {
      postId: string;
    }
  > | null> => commentsRepository.getCommentById(id),

  deleteCommentById: async (commentId: string, userId: string): Promise<number> =>
    commentsRepository.deleteCommentById(commentId, userId),

  updateCommentById: async (commentId: string, content: string, userId: string): Promise<number> =>
    commentsRepository.updateCommentById(commentId, content, userId),
};

export default commentsService;
