export const pageNumberParamValidation: any = {
  in: ['query'],
  customSanitizer: {
    options: (value: string) => value || 1,
  },
  errorMessage: 'The PageNumber parameter must be an integer',
  isInt: true,
  toInt: true,
};
