export interface IJwtTokenData{
    data: IGenerateJWTPayload & {
        type: string,
        id: number
    }
}


export interface IGenerateJWTPayload {
    email: string,
    firstName: string,
    lastName: string,
    permission: string[],
    roleName: string,
    status: string,
    tenantName: string,
    roleId: number,
    tenantId: number,
    userId: number
}


export interface IVerificationToken{
    data: {
        type: string,
        id: number,
        email: string
    }
}