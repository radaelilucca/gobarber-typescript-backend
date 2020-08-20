import { getRepository } from 'typeorm';
import bcryptjs from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      console.log('user');

      throw new Error('Invalid email/password combination');
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      console.log('pass');
      throw new Error('Invalid email/password combination');
    }

    delete user.password;

    // authenticated

    const token = sign({}, '1ce5afbf35bdc653829d85f8b3fc92ba', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
