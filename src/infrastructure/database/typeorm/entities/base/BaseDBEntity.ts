import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IEntity } from '../../../../../core/domain/types/IEntity';
import { BASE_SCHEMA } from '../../schemas/base/BaseSchema';

export abstract class BaseDbEntity<T extends IEntity> {
  @CreateDateColumn({
    name: BASE_SCHEMA.COLUMNS.CREATED_AT,
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: BASE_SCHEMA.COLUMNS.UPDATED_AT,
    type: 'timestamptz',
  })
  updatedAt: Date;

  /* Handlers */

  abstract toEntity(): T;
  abstract fromEntity(entity: T): IEntity;
}
