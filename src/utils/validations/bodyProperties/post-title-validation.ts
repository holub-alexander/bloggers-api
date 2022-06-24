export const postTitleValidation = {
  customSanitizer: {
    options: (value: string) => value?.trim(),
  },
  isLength: {
    errorMessage: 'Title length cannot exceed 30 characters',
    options: { max: 30, min: 1 },
  },
};
