import { ObjectId, WithId } from 'mongodb';
import { usersCollection } from '../db/db';
import { IUser } from '../interfaces/user';
import { IUserInput } from '../interfaces/user-input';
import { UserWithId } from '../types/user-with-id';
import { UsersPaginator } from '../types/users-paginator';
import pagination from '../utils/pagination';

const usersRepository = {
  addUser: async (newUser: IUser, userData: IUserInput): Promise<IUser> => {
    await usersCollection.insertOne({ ...userData, _id: new ObjectId() });

    return newUser;
  },

  getAllUsers: async (pageNumber: number, pageSize: number): Promise<UsersPaginator> => {
    // @ts-ignore
    const users = await pagination<IUser>(usersCollection, {}, pageNumber, pageSize, {
      id: 1,
      login: 1,
      _id: 0,
    });

    return users;
  },

  delteUserById: async (id: string): Promise<boolean> => {
    const deletedUser = await usersCollection.deleteOne({ id });

    return deletedUser.deletedCount === 1;
  },

  getUserByLogin: async (login: string): Promise<UserWithId | null> =>
    usersCollection.findOne({ login }),

  getUserById: async (id: string): Promise<UserWithId | null> => usersCollection.findOne({ id }),
};

export default usersRepository;
