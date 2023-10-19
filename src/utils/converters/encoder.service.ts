import { Injectable } from "@nestjs/common";
// Encriptacion
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncoderService {

  async encodePassword(password: string): Promise<string> {
    const salt = +process.env.HASH_SALT;
    return await bcrypt.hash(password, salt);
  }

  async checkPasswords(password: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }
}
