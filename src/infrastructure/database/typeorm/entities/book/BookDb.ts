import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../../../../core/domain/entities/Book';
import { IBook } from '../../../../../core/domain/types/IBook';
import { IEntity } from '../../../../../core/domain/types/IEntity';
import { BOOK_SCHEMA } from '../../schemas/book/BookSchema';
import { BaseDbEntity } from '../base/BaseDBEntity';

@Entity(BOOK_SCHEMA.TABLE_NAME)
export class BookDb extends BaseDbEntity<Book> implements IBook {
    @PrimaryGeneratedColumn('uuid', { name: BOOK_SCHEMA.COLUMNS.ID })
    id: string;

    @Column('varchar', {
        name: BOOK_SCHEMA.COLUMNS.NAME,
        length: 120,
    })
    name: string;

    @Column('varchar', {
        name: BOOK_SCHEMA.COLUMNS.DESCRIPTION,
        length: 195,
        nullable: true,
    })
    description: string;

    @Column('varchar', {
        name: BOOK_SCHEMA.COLUMNS.AUTHOR,
        length: 80,
    })
    author: string;

    @Column('date', { name: BOOK_SCHEMA.COLUMNS.PUBLISHAT, nullable: true })
    publishAt: Date;

    @Column('varchar', {
        name: BOOK_SCHEMA.COLUMNS.LANGUAGE,
        length: 80,
        nullable: true,
    })
    language: string;

    @Column('date', { name: BOOK_SCHEMA.COLUMNS.STARTREADAT, nullable: true })
    startReadAt: Date;

    @Column('date', { name: BOOK_SCHEMA.COLUMNS.FINISHREADAT, nullable: true })
    finishReadAt: Date;

    toEntity(): Book {
        return new Book(this);
    }

    fromEntity(entity: Book): IEntity {
        return entity.toData();
    }
}
