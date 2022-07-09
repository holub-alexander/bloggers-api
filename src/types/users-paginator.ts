import { WithId } from 'mongodb';
import { IPaginator } from '../interfaces/paginator';
import { IUser } from '../interfaces/user';

export type UsersPaginator = IPaginator<WithId<IUser>[]>;
