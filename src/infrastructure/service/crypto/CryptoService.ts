import { ICryptoService } from '../../../core/services/crypto/ICryptoService';
import * as bcrypt from 'bcryptjs';
import { Service } from 'typedi';

@Service('crypto.service')
export class CryptoService implements ICryptoService {
    generateHash(value: string): string {
        return bcrypt.hashSync(value, 18);
    }

    checkStringToHash(value: string, hash: string): boolean {
        return bcrypt.compareSync(value, hash);
    }
}
