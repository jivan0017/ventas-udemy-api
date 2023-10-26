import { cityMock } from "../../city/__mocks__/city.mock";
import { CreateAddressDto } from "../dto/create-address.dto";
import { addressMock } from "./address.mock";

export const createAddressMock: CreateAddressDto = {
    complement: addressMock.complement,
    numberAddress: addressMock.numberAddress,
    cep: addressMock.cep,
    cityId: cityMock.id
}
