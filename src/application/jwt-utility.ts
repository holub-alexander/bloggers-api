import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user';
import { JWT_SECRET } from '../utils/constants';

const jwtUtility = {
  async createJWT(user: IUser) {
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    return token;
  },
  async extractAdminIdFromToken(token: string): Promise<{ id: string } | null> {
    try {
      const result: any = jwt.verify(token, JWT_SECRET);

      return result;
    } catch (error) {
      return null;
    }
  },
};
export default jwtUtility;
