import { createUserMock } from "./create-user.mock";
import { returnUserDtoMock } from "./return-user-dto.mock";
import {jest} from '@jest/globals';

export const UserServiceMock = {
    create: jest.fn().mockReturnValue(createUserMock),
    findAll: jest.fn().mockReturnValue([returnUserDtoMock]),
    getUserById: jest.fn(), 
    getUserByEmail: jest.fn(), 
    getUserByIdUsingRelationship: jest.fn(),
}
