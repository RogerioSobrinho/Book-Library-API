export interface ICryptoService {
    generateHash(value: string): Promise<string>;

    compareHash(value: string, hash: string): Promise<boolean>;
}
