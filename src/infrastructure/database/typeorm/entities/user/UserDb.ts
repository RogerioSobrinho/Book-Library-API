import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../../../core/domain/entities/User';
import { IEntity } from '../../../../../core/domain/types/IEntity';
import { IUser } from '../../../../../core/domain/types/IUser';
import { USER_SCHEMA } from '../../schemas/user/UserSchema';
import { BaseDbEntity } from '../base/BaseDBEntity';

@Entity(USER_SCHEMA.TABLE_NAME)
export class UserDb extends BaseDbEntity<User> implements IUser {
    @PrimaryGeneratedColumn('uuid', { name: USER_SCHEMA.COLUMNS.ID })
    id: string;

    @Column('varchar', {
        name: USER_SCHEMA.COLUMNS.EMAIL,
        length: 120,
    })
    email: string;

    @Column('varchar', {
        name: USER_SCHEMA.COLUMNS.PASSWORD,
        length: 255,
    })
    password: string;

    toEntity(): User {
        return new User(this);
    }

    fromEntity(entity: User): IEntity {
        return entity.toData();
    }
}
