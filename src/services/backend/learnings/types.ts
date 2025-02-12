export type StandardResponse = {
  status: 'DATA' | 'ERROR';
  successMessage?: string;
  errorMessage?: string;
  data: unknown;
};
