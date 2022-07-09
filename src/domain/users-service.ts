import { IUser } from '../interfaces/user';
import usersRepository from '../repositories/users-db-repository';
import { UsersPaginator } from '../types/users-paginator';

const usersService = {
  addUser: async (login: string, password: string): Promise<IUser> => {
    const newUser: IUser = {
      id: new Date().valueOf().toString(),
      login,
    };

    await usersRepository.addUser(newUser, { login, password });

    return newUser;
  },

  getAllUsers: async (pageNumber: number, pageSize: number): Promise<UsersPaginator> =>
    usersRepository.getAllUsers(pageNumber, pageSize),

  deleteUserById: async (id: string): Promise<boolean> => usersRepository.delteUserById(id),
};

export default usersService;
