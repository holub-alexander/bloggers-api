export const YOUTUBE_URL_REGEXP =
  /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;
export const SEARCH_NAME_BLOGGER_REGEXP = (searchName: string): RegExp =>
  new RegExp(`^${searchName}.*`, 'gi');
