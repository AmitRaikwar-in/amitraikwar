import { useMutation } from '@tanstack/react-query';
import { useCallSBMutationArgs } from './types';

const useCallSBMutation = <TRequest, TResponse>({
  method,
  mutationOptions,
}: useCallSBMutationArgs<TRequest, TResponse>) =>
  useMutation({
    ...mutationOptions,
    mutationFn: (request) => method(request),
  });

export default useCallSBMutation;
