export const pageSizeParamValidation: any = {
  in: ['query'],
  customSanitizer: {
    options: (value: string) => value || 10,
  },
  errorMessage: 'The PageSize parameter must be an integer',
  isInt: true,
  toInt: true,
};
