import { categoryMock } from "../../category/__mocks__/category.mock";
import { CreateProductDto } from "../dto/create-product.dto";

export const createProductMock: CreateProductDto = {
    categoryId: categoryMock.id,
    name: "product name mock",
    price: 81700.00,
    image: "https://myimage/233214"
}
