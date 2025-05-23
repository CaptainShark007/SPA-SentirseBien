import { apiListSpa } from '@features/api/serviceSpa.api';
import { useQuery } from '@tanstack/react-query';

export const useApiListSpa = () => {
  const query = useQuery({ queryKey: ['listSpa'], queryFn: apiListSpa });

  return { ...query };
};
