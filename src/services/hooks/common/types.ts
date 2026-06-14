import {
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export type useCallSBMutationArgs<
  TRequest,
  TResponse,
> = {
  method: (request: TRequest) => Promise<TResponse>;
  mutationOptions?: Omit<
    UseMutationOptions<TResponse, Error, TRequest>,
    'mutationFn'
  >;
};

export type useCallSBQueryArgs<
  TRequest,
  TResponse,
> = {
  method: (request: any) => Promise<TResponse> | TResponse;
  queryOptions: Omit<UseQueryOptions<TResponse, Error, TRequest>, 'queryFn'>;
};
