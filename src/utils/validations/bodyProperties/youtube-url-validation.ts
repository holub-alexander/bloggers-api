import { YOUTUBE_URL_REGEXP } from '../../regexp';

export const youtubeUrlValidation = {
  isLength: {
    errorMessage: 'The field length cannot be more than 100 characters',
    options: { max: 100 },
  },
  matches: {
    errorMessage: 'The URL you entered is not in the correct format',
    options: YOUTUBE_URL_REGEXP,
  },
};
