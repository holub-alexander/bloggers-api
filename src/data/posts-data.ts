export interface IPost {
  id: number;
  title: string;
  shortDescription: string;
  content: string;
  bloggerId: number;
  bloggerName: string;
}

export const POSTS: IPost[] = [
  {
    id: 0,
    title: 'Post 1',
    shortDescription: 'Description 1',
    content: 'Content 1',
    bloggerId: 0,
    bloggerName: 'Blogger 1',
  },
  {
    id: 1,
    title: 'Post 2',
    shortDescription: 'Description 2',
    content: 'Content 2',
    bloggerId: 1,
    bloggerName: 'Blogger 2',
  },
  {
    id: 2,
    title: 'Post 3',
    shortDescription: 'Description 3',
    content: 'Content 3',
    bloggerId: 1,
    bloggerName: 'Blogger 2',
  },
];
