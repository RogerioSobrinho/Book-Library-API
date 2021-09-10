export class CreateBookCommand {
    name: string;
    userId: string;
    description: string | null;
    picture: string | null;
    author: string;
    publishAt: Date | null;
    language: string | null;
    startReadAt: Date | null;
    finishReadAt: Date | null;
}
