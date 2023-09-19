import { User } from '../interfaces/user/user.interface';

export class CreateUserDto implements User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
}
