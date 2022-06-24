export const postShortDescriptionValidation = {
  customSanitizer: {
    options: (value: string) => value?.trim(),
  },
  isLength: {
    errorMessage: 'Short description length cannot exceed 100 characters',
    options: { max: 100, min: 1 },
  },
};
