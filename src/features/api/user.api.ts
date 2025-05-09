import AxiosClient from '@app/axios';
import { UserService } from '@features/services/user.service';

const userService = new UserService(AxiosClient);

export const apiListUserReserve = async (id: number) =>
  userService.listUserReserve(id);

export type ParamsDeleteUserReserve = { userId: number; reserveId: number };
export const apiDeleteUserReserve = async ({
  userId,
  reserveId,
}: ParamsDeleteUserReserve) => userService.deleteUserReserve(userId, reserveId);
