export interface UserModel {
    _id?: any
    name?: string
    surname?: string
    username: string
    birthDate?: Date
    email: string
    password: string
    roles?: Array<UserRoles>
    isAdmin?: () => boolean
}

export enum UserRoles {
    ROLE_USER = "ROLE_USER",
    ROLE_ADMIN = "ROLE_ADMIN"
}