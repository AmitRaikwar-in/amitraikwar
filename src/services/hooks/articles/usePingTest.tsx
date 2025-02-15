import { pingTest } from '../../backend';
import { useCallQuery } from '../common';

const usePingTest = () => {
  return useCallQuery({
    method: () => pingTest(),
    queryOptions: {
      queryKey: ['ping'],
      staleTime: 0,
      gcTime: 0,
    },
  });
};

export default usePingTest;
