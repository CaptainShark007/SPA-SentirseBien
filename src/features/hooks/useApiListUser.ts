import { apiListUser } from '@features/api/admin.api';
import { useQuery } from '@tanstack/react-query';

export const useApiListUser = () => {
  const query = useQuery({ queryKey: ['listUser'], queryFn: apiListUser });

  return { ...query };
};
