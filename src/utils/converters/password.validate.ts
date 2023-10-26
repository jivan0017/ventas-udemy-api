import { compare, hash } from 'bcrypt';

export class PasswordValidate {

    public static async checkPasswords(password: string, userPassword: string): Promise<boolean> {
        return await compare(password, userPassword);
    }

    public static async encodePassword(password: string): Promise<string> {
        const salt = +process.env.HASH_SALT;
        return await hash(password, salt);
    }
}
