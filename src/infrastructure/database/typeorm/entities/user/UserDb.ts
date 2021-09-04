import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../../../core/domain/entities/User';
import { RoleId } from '../../../../../core/domain/enums/role/RoleId';
import { IBook } from '../../../../../core/domain/types/IBook';
import { IEntity } from '../../../../../core/domain/types/IEntity';
import { IUser } from '../../../../../core/domain/types/IUser';
import { USER_SCHEMA } from '../../schemas/user/UserSchema';
import { BaseDbEntity } from '../base/BaseDBEntity';
import { BookDb } from '../book/BookDb';

@Entity(USER_SCHEMA.TABLE_NAME)
export class UserDb extends BaseDbEntity<User> implements IUser {
    @PrimaryGeneratedColumn('uuid', { name: USER_SCHEMA.COLUMNS.ID })
    id: string;

    @Column('varchar', {
        name: USER_SCHEMA.COLUMNS.ROLE,
        length: 20,
        nullable: false,
    })
    role: RoleId;

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

    /* Relationship */

    @OneToMany(() => BookDb, book => book.userId)
    books: IBook[] | null;

    toEntity(): User {
        return new User(this);
    }

    fromEntity(entity: User): IEntity {
        return entity.toData();
    }
}
