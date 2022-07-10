import { IUser } from '../interfaces/user';

declare global {
  declare namespace Express {
    export interface Request {
      user: IUser;
    }
  }
}
