import { IBaseRepository } from '../../domain/common/database/interfaces/IBaseRepository';
import { User } from '../../domain/entities/User';

export interface IUserRepository extends IBaseRepository<User, string> {
    getByEmail(email: string): Promise<User>;
}
