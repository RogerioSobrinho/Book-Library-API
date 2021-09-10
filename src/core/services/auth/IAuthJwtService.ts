export interface IJwtPayload {
    sub: string; // Subject
    exp: number; // Expiration time
    iat: number; // Issued at
    iss: string; // Issuer
    aud: string; // Audience
}

export interface IJwtPayloadExtend extends IJwtPayload {
    userId: string;
}

export interface IAuthJwtService {
    sign(userId: string): string;

    verify(token: string): IJwtPayloadExtend;
}
