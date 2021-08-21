export class CreateBookCommandResult {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public author: string,
        public publishAt: Date,
        public language: string,
        public startReadAt: Date,
        public finishReadAt: Date,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}
