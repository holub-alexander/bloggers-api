export const commeentContentValidation = {
  customSanitizer: {
    options: (value: string) => value?.trim(),
  },
  isLength: {
    errorMessage: 'Post comments must be between 20 and 300 characters long',
    options: { max: 300, min: 20 },
  },
};
