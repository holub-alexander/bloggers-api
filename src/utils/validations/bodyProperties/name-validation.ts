export const nameValidation = {
  customSanitizer: {
    options: (value: string) => value?.trim(),
  },
  isLength: {
    errorMessage: 'Name length cannot exceed 15 characters',
    options: { max: 15, min: 1 },
  },
};
