import { CategoryEntity } from "../entities/category.entity";

export const categoryMock: CategoryEntity = {
    id: 1,
    name: "category test",
    status: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    products: []
}
