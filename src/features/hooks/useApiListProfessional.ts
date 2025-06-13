import { apiListProfessional } from '@features/api/serviceSpa.api';
import { useQuery } from '@tanstack/react-query';

export const useApiListProfessional = () => {
  const query = useQuery({
    queryKey: ['listProfessional'],
    queryFn: apiListProfessional,
  });

  return { ...query };
};
