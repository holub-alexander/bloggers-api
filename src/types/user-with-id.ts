import { WithId } from 'mongodb';

export type UserWithId = WithId<{
  id: string;
  passwordHash: string;
  login: string;
  password: string;
}>;
