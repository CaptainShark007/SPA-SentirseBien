import { apiGetService } from '@features/api/serviceSpa.api';
import { useQuery } from '@tanstack/react-query';

export const useApiGetService = (id: number) => {
  const query = useQuery({
    queryKey: ['getService'],
    queryFn: () => apiGetService(id),
  });

  return { ...query };
};
