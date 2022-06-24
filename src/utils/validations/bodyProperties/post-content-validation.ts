export const postContentValidation = {
  customSanitizer: {
    options: (value: string) => value?.trim(),
  },
  isLength: {
    errorMessage: 'Content length cannot exceed 1000 characters',
    options: { max: 100, min: 1 },
  },
};
