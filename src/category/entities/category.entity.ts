import { ProductEntity } from "../../product/entities/product.entity";
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";

@Entity({ name: 'category' })
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'name',
        nullable: false
    })
    name: string;

    @Column({
        default: true,
        name: 'status'
    })
    status: boolean;    
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(
        () => ProductEntity,
        (product: ProductEntity) => product.category
    )
    products?: ProductEntity[];
}
