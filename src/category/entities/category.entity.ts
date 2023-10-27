import { ProductEntity } from "src/product/entities/product.entity";
import { AddressEntity } from "../../address/entities/address.entity";
import { StateEntity } from "../../state/entities/state.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    products: ProductEntity[];
}
