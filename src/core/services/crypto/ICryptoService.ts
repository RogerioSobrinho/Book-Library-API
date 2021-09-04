export interface ICryptoService {
    generateHash(value: string): string;

    checkStringToHash(value: string, hash: string): boolean;
}
