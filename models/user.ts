export interface UserModel {
    _id: string
    username: string
    email: string
    password: string
    roles?: Array<UserRoles>
    isAdmin?: () => boolean
}

export enum UserRoles {
    ROLE_USER = "ROLE_USER",
    ROLE_ADMIN = "ROLE_ADMIN"
}