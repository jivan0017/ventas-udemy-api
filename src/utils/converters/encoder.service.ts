import { Injectable } from "@nestjs/common";
// Encriptacion
// import * as bcrypt from 'bcrypt';
import { compare, hash } from 'bcrypt';

@Injectable()
export class EncoderService {

  async encodePassword(password: string): Promise<string> {
    const salt = +process.env.HASH_SALT;
    return await hash(password, salt);
  }

  async checkPasswords(password: string, userPassword: string): Promise<boolean> {
    return await compare(password, userPassword);
  }
}
