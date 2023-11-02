import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UserType } from './enum/user-type.enum';

@Injectable()
export class UserService {

    // NOTE: DEPRECATED
    //   private users: CreateUserDto[] = [];

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {

        const userEmailExist = await this.getUserByEmail(createUserDto.email)
            .catch(() => undefined);

        if (userEmailExist) {
            throw new BadGatewayException('Email registered in system');
        }

        const salt = 10;
        const passwordHash = await hash(createUserDto.password, salt);

        return this.userRepository.save({
            ...createUserDto,
            typeUser: UserType.User,
            password: passwordHash
        });

        // createUserDto.password = passwordHash;
        // this.users.push(createUserDto);
        // console.log('cantidad >>> ', this.users.length);
        // return createUserDto;
    }

    async findAll(): Promise<UserEntity[]> {

        try {
            // return this.users;
            return this.userRepository.find({});
        } catch (error) {
            console.log(">>> error: ", error)
        }
    }

    async getUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new NotFoundException(`userId ${userId} Not Found`);
        }

        return user;
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email
            }
        });

        if (!user) {
            throw new NotFoundException(`Email ${email} Not Found`);
        }

        return user;
    }

    async getUserByIdUsingRelationship(userId: number): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                // addresses: true 
                addresses: {
                    city: {
                        state: true,
                    }
                }
             }
            // relations: ['addresses']
        });
    }

    // findOne(id: number) {
    //     return `This action returns a #${id} user`;
    // }

    // update(id: number, updateUserDto: UpdateUserDto) {
    //     return `This action updates a #${id} user`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} user`;
    // }
}
