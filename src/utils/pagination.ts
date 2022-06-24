import { Collection, WithId } from 'mongodb';
import { IPaginator } from '../interfaces/paginator';
import { getNumberSkipItems } from './getNumberSkipItems';

const pagination = async <T>(
  collection: Collection<T>,
  filter: {},
  pageNumber: number,
  pageSize: number
): Promise<IPaginator<WithId<T>[]>> => {
  const skipItems = getNumberSkipItems(pageNumber, pageSize);
  const data = await collection
    .find(filter, { projection: { _id: 0 } })
    .skip(skipItems)
    .limit(pageSize);
  const totalCount = await collection.count(filter);
  const pagesCount = Math.ceil(totalCount / pageSize);

  const arr = await data.toArray();

  const res: IPaginator<WithId<T>[]> = {
    pagesCount,
    page: pageNumber,
    pageSize,
    totalCount,
    items: arr,
  };

  return res;
};

export default pagination;
