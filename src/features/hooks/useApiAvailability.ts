import {
  apiAvailability,
  ParamsAvailability,
} from '@features/api/serviceSpa.api';
import { useQuery } from '@tanstack/react-query';

export const useApiAvailability = (params: ParamsAvailability) => {
  const query = useQuery({
    queryKey: ['availability'],
    queryFn: () => apiAvailability(params),
  });

  return { ...query };
};
