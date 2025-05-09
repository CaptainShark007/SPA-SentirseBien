import { apiListSpa } from '@features/api/serviceSpa.api';
import { useQuery } from '@tanstack/react-query';

export const useApiListSpa = () => {
  const { data } = useQuery({ queryKey: ['listSpa'], queryFn: apiListSpa });

  return { data };
};
