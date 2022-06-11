export interface IBlogger {
  id: number;
  name: string;
  youtubeUrl: string;
}

export const BLOGGERS: IBlogger[] = [
  {
    id: 0,
    name: 'Blogger 1',
    youtubeUrl: 'https://youtube.com/1',
  },
  {
    id: 1,
    name: 'Blogger 2',
    youtubeUrl: 'https://youtube.com/2',
  },
  {
    id: 2,
    name: 'Blogger 3',
    youtubeUrl: 'https://youtube.com/3',
  },
];
