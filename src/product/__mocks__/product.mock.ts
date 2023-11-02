import { ProductEntity } from "../entities/product.entity";

export const productMock: ProductEntity = {
    id: 17000,
    name: "product test",
    categoryId: 0,
    price: 817000,
    image: "http://image.com",
    // status: false,
    createdAt: new Date(),
    updatedAt: new Date()
}
