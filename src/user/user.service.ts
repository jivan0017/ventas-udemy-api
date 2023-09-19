import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private users: CreateUserDto[] = [];

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const salt = 10;
    const passwordHash = await hash(createUserDto.password, salt);
    console.log('>>> pass', passwordHash);
    createUserDto.password = passwordHash;
    this.users.push(createUserDto);
    console.log('cantidad >>> ', this.users.length);
    return createUserDto;
  }

  async findAll(): Promise<CreateUserDto[]> {
    return this.users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
