import { usersCollection } from '../db/db';
import { IUser } from '../interfaces/user';
import { IUserInput } from '../interfaces/user-input';
import { UsersPaginator } from '../types/users-paginator';
import pagination from '../utils/pagination';

const usersRepository = {
  addUser: async (newUser: IUser, userData: IUserInput): Promise<IUser> => {
    await usersCollection.insertOne({
      login: userData.login,
      // @ts-ignore
      password: userData.password,
      _id: undefined,
    });

    return newUser;
  },

  getAllUsers: async (pageNumber: number, pageSize: number): Promise<UsersPaginator> => {
    const users = await pagination<IUser>(usersCollection, {}, pageNumber, pageSize);

    return users;
  },

  delteUserById: async (id: string): Promise<boolean> => {
    console.log('ID ====>', id);

    const deletedUser = await usersCollection.deleteOne({ id });

    // usersCollection.deleteMany({});

    return deletedUser.deletedCount === 1;
  },
};

export default usersRepository;
