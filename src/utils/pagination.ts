import { Collection, WithId } from 'mongodb';
import { IPaginator } from '../interfaces/paginator';
import { getNumberSkipItems } from './getNumberSkipItems';

const pagination = async <T>(
  collection: Collection<T>,
  pageNumber: number,
  pageSize: number
): Promise<IPaginator<WithId<T>[]>> => {
  const skipItems = getNumberSkipItems(pageNumber, pageSize);
  const data = await collection
    .find({}, { projection: { _id: 0 } })
    .skip(skipItems)
    .limit(pageSize);
  const totalCount = await collection.count({});
  const pagesCount = Math.ceil(totalCount / pageSize);
  const numberOnPage = await data.count();

  const arr = await data.toArray();

  const res: IPaginator<WithId<T>[]> = {
    pagesCount,
    page: pageNumber,
    pageSize: numberOnPage,
    totalCount,
    items: arr,
  };

  return res;
};

export default pagination;
