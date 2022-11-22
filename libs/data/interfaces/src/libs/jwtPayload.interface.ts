export type jwtUser = IJWTPayload & {
    type: string,
    id: string
}
export interface IJwtTokenData {
    data: jwtUser
}
export interface IJWTPayload {
    email: string,
    firstName: string,
    lastName: string | null,
    roleName: string,
    status: string,
    tenantName: string,
    roleId: string,
    tenantId: string,
    userId: string,
    accessExpiryTime: string
    refreshExpiryTIme: string
}


export interface IVerificationToken {
    data: {
        type: string,
        id: string,
        email: string
    }
}