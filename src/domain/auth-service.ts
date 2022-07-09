import bcrypt from 'bcrypt';
import { WithId } from 'mongodb';
import { IUserInput } from '../interfaces/user-input';
import usersRepository from '../repositories/users-db-repository';

const authService = {
  async checkCredentials(login: string, password: string): Promise<WithId<IUserInput> | null> {
    const user = await usersRepository.getUserByLogin(login);

    if (!user) {
      return null;
    }

    const checkPassword = await authService.isPasswordCorrect(password, user.passwordHash);

    if (user && checkPassword) {
      return user;
    }

    return null;
  },

  async generateHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);

    return hash;
  },

  async isPasswordCorrect(password: string, hash: string): Promise<boolean> {
    const compareResult: boolean = await bcrypt.compare(password, hash);

    return compareResult;
  },
};

export default authService;
