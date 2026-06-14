import { useMutation } from '@tanstack/react-query';
import { useCallSBMutationArgs } from './types';

const useCallSBMutation = <TRequest extends object, TResponse extends object>({
  method,
  mutationOptions,
}: useCallSBMutationArgs<TRequest, TResponse>) =>
  useMutation({
    ...mutationOptions,
    mutationFn: (request) => method(request),
  });

export default useCallSBMutation;
