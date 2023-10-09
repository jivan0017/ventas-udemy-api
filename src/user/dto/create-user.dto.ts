import { IUser } from '../interfaces/user/user.interface';

export class CreateUserDto implements IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
}
