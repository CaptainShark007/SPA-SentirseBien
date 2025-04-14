import axios from 'axios';

import {
    UserData,
    UserResponse
} from '@/features/user/user.types';

class UserService {

    // funcionando
    newUser(userDetails: UserData): Promise<{ response: UserResponse }> {
        return axios.post(`/api/user/new`, userDetails);
    }

    // funcionando
    userList(): Promise<{ response: UserResponse }> {
        return axios.get(`/api/user/list`);
    }

    // funcionando
    findUserById(data: number): Promise<{ response: UserResponse }> {
        return axios.get(`/api/user/${data}`);
    }

    // funcionando
    updateUserById(userId: number, userDetails: UserData): Promise<{ response: UserResponse }> {
        return axios.put(`/api/user/update/${userId}`, userDetails);
    }

    deleteUserById(userId: number): Promise<{ response: UserResponse }> {
        return axios.delete(`/api/user/delete/${userId}`);
    }

}

export default new UserService();