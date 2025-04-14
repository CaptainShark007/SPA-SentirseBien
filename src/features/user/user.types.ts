export interface UserData {
    username: string,
    password: string,
    lastName: string,
    firstName: string
}

export interface UserResponse {
    id: number,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    createAt: string,
    updateAt: string,
    roleName: string
}