import {
    UserData,
    UserResponse
} from '@/features/user/user.types';

import userService from '@/features/user/user.service';

// funcionando
export const apiNewUser = async (
    dataSend: UserData
): Promise<UserResponse> => {
    const { response } = await userService.newUser(dataSend);
    return response;
}

// funcionando
export const apiUserList = async (): Promise<UserResponse> => {
    const { response } = await userService.userList();
    return response;
}

// funcionando
export const apiFindUserById = async (
    dataSend: number
): Promise<UserResponse> => {
    const { response } = await userService.findUserById(dataSend);
    return response;
}

// funcionando
export const apiUpdateUserById = async (
    userId: number,
    userDetails: UserData
): Promise<UserResponse> => {
    const { response } = await userService.updateUserById(userId, userDetails);
    return response;
}

export const apiDeleteUserById = async (userId: number): Promise<UserResponse> => {
    const { response } = await userService.deleteUserById(userId);
    return response;
}
