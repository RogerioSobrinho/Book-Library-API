import { Inject } from 'typedi';
import { getRepository, Repository } from 'typeorm';
import { IBaseRepository } from '../../../../../core/domain/common/database/interfaces/IBaseRepository';
import { IDbContext } from '../../../../../core/domain/common/database/interfaces/IDbContext';
import { IEntity } from '../../../../../core/domain/types/IEntity';
import { BaseDbEntity } from '../../entities/base/BaseDBEntity';

export abstract class BaseRepository<
    TEntity extends IEntity,
    TDbEntity extends BaseDbEntity<TEntity>,
    TIdentityType,
> implements IBaseRepository<TEntity, TIdentityType>
{
    @Inject('db.context')
    protected readonly dbContext: IDbContext;

    protected readonly repository: Repository<TDbEntity>;

    constructor(
        private _type: { new (): TDbEntity },
        private _schema: { TABLE_NAME: string },
    ) {
        this.repository = getRepository(this._type);
    }

    async count(): Promise<number> {
        return await this.repository
            .createQueryBuilder(this._schema.TABLE_NAME)
            .getCount();
    }

    async getById(id: TIdentityType): Promise<TEntity | null> {
        const result = await this.repository
            .createQueryBuilder(this._schema.TABLE_NAME)
            .whereInIds(id)
            .getOne();
        return result ? result.toEntity() : null;
    }

    async create(data: TEntity): Promise<TIdentityType | null> {
        const result = await this.repository
            .createQueryBuilder(this._schema.TABLE_NAME)
            .insert()
            .values(new this._type().fromEntity(data) as any)
            .execute();
        return (
            result.identifiers &&
            result.identifiers.length &&
            result.identifiers[0].id
        );
    }

    async createGet(data: TEntity): Promise<TEntity | null> {
        const result = await this.repository
            .createQueryBuilder(this._schema.TABLE_NAME)
            .insert()
            .values(new this._type().fromEntity(data) as any)
            .execute();
        const id =
            result.identifiers &&
            result.identifiers.length &&
            result.identifiers[0].id;
        if (!id) return null;
        return await this.getById(id);
    }

    async createMultiple(list: TEntity[]): Promise<TIdentityType[]> {
        const result = await this.repository
            .createQueryBuilder(this._schema.TABLE_NAME)
            .insert()
            .values(list.map(item => new this._type().fromEntity(item)) as any)
            .execute();
        return result.identifiers && result.identifiers.length
            ? result.identifiers.map(identifier => identifier.id)
            : [];
    }

    async update(id: TIdentityType, data: TEntity): Promise<boolean> {
        const result = await this.repository
            .createQueryBuilder(this._schema.TABLE_NAME)
            .update(new this._type().fromEntity(data) as any)
            .whereInIds(id)
            .execute();
        return !!result.affected;
    }

    async updateGet(id: TIdentityType, data: TEntity): Promise<TEntity | null> {
        const result = await this.repository
            .createQueryBuilder(this._schema.TABLE_NAME)
            .update(new this._type().fromEntity(data) as any)
            .whereInIds(id)
            .execute();
        const hasSucceed = !!result.affected;
        if (!hasSucceed) return null;
        return await this.getById(id);
    }

    async delete(id: TIdentityType): Promise<boolean> {
        const result = await this.repository
            .createQueryBuilder(this._schema.TABLE_NAME)
            .delete()
            .whereInIds(id)
            .execute();
        return !!result.affected;
    }

    async deleteMultiple(ids: TIdentityType[]): Promise<boolean> {
        const result = await this.repository
            .createQueryBuilder(this._schema.TABLE_NAME)
            .delete()
            .whereInIds(ids)
            .execute();
        return !!result.affected && result.affected === ids.length;
    }
}
