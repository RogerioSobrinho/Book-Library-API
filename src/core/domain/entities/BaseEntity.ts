import { IEntity } from '../types/IEntity';

export abstract class BaseEntity<TEntity extends IEntity> implements IEntity {
    constructor(protected readonly data = {} as TEntity) {}

    get createdAt(): Date {
        return this.data.createdAt;
    }

    get updatedAt(): Date {
        return this.data.updatedAt;
    }

    /* Handlers */

    toData(): TEntity {
        return this.data;
    }
}
