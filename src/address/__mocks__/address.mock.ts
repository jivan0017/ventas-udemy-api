import { userEntityMock } from "../../user/__mocks__/user.mock";
import { cityMock } from "../../city/__mocks__/city.mock";
import { AddressEntity } from "../entities/address.entity";

export const addressMock: AddressEntity = {
    id: 1,
    userId: userEntityMock.id,
    complement: "",
    numberAddress: 0,
    cep: "",
    cityId: cityMock.id,
    createdAt: new Date(),
    updatedAt: new Date(),
}
