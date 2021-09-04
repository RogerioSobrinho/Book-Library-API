import { Service } from 'typedi';
import { User } from '../../../../../core/domain/entities/User';
import { IUserRepository } from '../../../../../core/repositories/user/IUserRepository';
import { UserDb } from '../../entities/user/UserDb';
import { USER_SCHEMA } from '../../schemas/user/UserSchema';
import { BaseRepository } from '../base/BaseRepository';

@Service('user.repository')
export class UserRepository
    extends BaseRepository<User, UserDb, string>
    implements IUserRepository
{
    constructor() {
        super(UserDb, USER_SCHEMA);
    }

    async getByEmail(email: string): Promise<User> {
        const user = await this.repository
            .createQueryBuilder(USER_SCHEMA.TABLE_NAME)
            .where(
                `${USER_SCHEMA.TABLE_NAME}.${USER_SCHEMA.COLUMNS.EMAIL} = :email`,
                {
                    email,
                },
            )
            .getOne();
        return user ? user.toEntity() : null;
    }
}
