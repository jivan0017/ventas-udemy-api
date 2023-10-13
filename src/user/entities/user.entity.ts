import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IUser } from "../interfaces/user/user.interface";

@Entity({ name: 'user' })
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'name',
        unique: false,
        nullable: false
    })
    name: string;

    @Column({
        name: 'email',
        unique: false,
        nullable: false
    })
    email: string;

    @Column({        
        name: 'cpf',
        default: 'CPF'
    })
    cpf: string;    

    @Column({
        name: 'phone',
        unique: false,
    })
    phone: string;

    @Column({
        name: 'password',
        unique: false,
        nullable: false
    })
    password: string;

    @Column({
        name: 'type_user',
    })
    typeUser: number;    

    @Column({
        default: true,
        name: 'status'
    })
    status: boolean;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'NOW()',
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'NOW()',
        name: 'updated_at'
    })
    updatedAt: Date;
}
