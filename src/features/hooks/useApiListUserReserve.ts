import { apiListUserReserve } from '@features/api/user.api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

export const useApiListUserReserve = () => {
  const params = useParams<{ idUser: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['listUserReserve', params.idUser],
    queryFn: () => apiListUserReserve(Number(params.idUser)),
  });

  return { data, isLoading };
};
