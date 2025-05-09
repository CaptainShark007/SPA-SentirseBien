import {
  apiAvailability,
  ParamsAvailability,
} from '@features/api/serviceSpa.api';
import { useMutation } from '@tanstack/react-query';

export const useApiAvailability = () => {
  const { mutate, data, isPending } = useMutation({
    mutationKey: ['availability'],
    mutationFn: apiAvailability,
  });

  const availability = (params: ParamsAvailability) => {
    mutate(params);
  };

  return { availability, data, isPending };
};
