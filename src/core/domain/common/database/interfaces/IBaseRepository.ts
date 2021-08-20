export interface IBaseRepository<TEntity, TIdentityType> {
    count(): Promise<number>;
    getById(id: TIdentityType): Promise<TEntity | null>;
    create(data: TEntity): Promise<TIdentityType | null>;
    createGet(data: TEntity): Promise<TEntity | null>;
    createMultiple(list: TEntity[]): Promise<TIdentityType[]>;
    update(id: TIdentityType, data: TEntity): Promise<boolean>;
    updateGet(id: TIdentityType, data: TEntity): Promise<TEntity | null>;
    delete(id: TIdentityType): Promise<boolean>;
    deleteMultiple(ids: TIdentityType[]): Promise<boolean>;
}
