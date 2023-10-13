import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: CreateUserDto[] = [];

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const salt = 10;
    const passwordHash = await hash(createUserDto.password, salt);

    console.log('>>> pass', passwordHash);

    return this.userRepository.save({
        ...createUserDto,
        typeUser: 1,
        password: passwordHash
    });    
    // createUserDto.password = passwordHash;
    // this.users.push(createUserDto);
    // console.log('cantidad >>> ', this.users.length);
    // return createUserDto;
  }

  async findAll(): Promise<CreateUserDto[]> {
    
    try {
        // return this.users;
        return this.userRepository.find({});
    } catch (error) {
        console.log(">>> error: ", error)
    }
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
