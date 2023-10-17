import { IsString } from 'class-validator';
import { IUser } from '../interfaces/user/user.interface';

export class CreateUserDto implements IUser {  
//   id: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;

  @IsString()
  cpf: string;

  typeUser: number;
}
