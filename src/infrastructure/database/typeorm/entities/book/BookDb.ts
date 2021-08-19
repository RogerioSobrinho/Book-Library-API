import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../../../../core/domain/entities/Book';
import { IBook } from '../../../../../core/domain/types/IBook';
import { IEntity } from '../../../../../core/domain/types/IEntity';
import { BOOK_SCHEMA } from '../../schemas/book/BookSchema';
import { BaseDbEntity } from '../base/BaseDBEntity';

@Entity(BOOK_SCHEMA.TABLE_NAME)
export class BookDb extends BaseDbEntity<Book> implements IBook {
  @PrimaryGeneratedColumn('uuid', { name: BOOK_SCHEMA.COLUMNS.ID })
  id: number;
  @Column('varchar', { name: BOOK_SCHEMA.COLUMNS.NAME, length: 120 })
  name: string;
  @Column('varchar', { name: BOOK_SCHEMA.COLUMNS.DESCRIPTION, length: 195 })
  description: string;
  @Column('varchar', { name: BOOK_SCHEMA.COLUMNS.AUTHOR, length: 80 })
  author: string;
  @Column('date', { name: BOOK_SCHEMA.COLUMNS.PUBLISHAT })
  publishAt: Date;
  @Column('varchar', { name: BOOK_SCHEMA.COLUMNS.LANGUAGE, length: 80 })
  language: string;
  @Column('date', { name: BOOK_SCHEMA.COLUMNS.STARTREADAT })
  startReadAt: Date;
  @Column('date', { name: BOOK_SCHEMA.COLUMNS.FINISHREADAT })
  finishReadAt: Date;

  toEntity(): Book {
    return new Book(this);
  }
  fromEntity(entity: Book): IEntity {
    return entity.toData();
  }
}
