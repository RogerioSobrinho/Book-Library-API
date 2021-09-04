import { RoleId } from '../../../../domain/enums/role/RoleId';

export class CreateUserCommand {
    email: string;
    role: RoleId;
    password: string;
}
