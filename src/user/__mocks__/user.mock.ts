import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userEntityMock: UserEntity = {
    cpf: 'cpf',
    createdAt: new Date(),
    email: 'email@test.com',
    id: 1,
    name: 'user one',
    password: '$2b$10$YR5YYlIjUoVB9mUBtEVSD.O138kXxrsXQiQ8.8xjJ1bcQ.uj2EZ96',
    phone: '3207945514',
    typeUser: UserType.Admin,
    updatedAt: new Date(),
    status: true,
    addresses: undefined,
}
