import { ICryptoService } from '../../../core/services/crypto/ICryptoService';
import * as bcrypt from 'bcrypt';
import { Service } from 'typedi';

@Service('crypto.service')
export class CryptoService implements ICryptoService {
    generateHash(value: string): Promise<string> {
        return bcrypt.hash(value, 18);
    }

    compareHash(value: string, hash: string): Promise<boolean> {
        return bcrypt.compare(value, hash);
    }
}
