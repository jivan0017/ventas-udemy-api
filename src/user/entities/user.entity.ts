import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../interfaces/user/user.interface";

@Entity({ name: 'users' })
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
        default: true,
        name: 'status'
    })
    status: boolean;

    @Column({
        type: 'timestamp',
        default: () => 'NOW()',
        name: 'created_at'
    })
    createdAt: Date;

    // @Column({
    //     type: 'datetime',
    //     default: () => 'CURRENT_TIMESTAMP',
    //     name: 'updated_at'
    // })
    // updatedAt: Date;
}
