import { getRepository } from 'typeorm';
import bcryptjs from 'bcryptjs';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkExists = await userRepository.findOne({ where: { email } });

    if (checkExists) {
      throw Error('Email address already used.');
    }

    const hashPassword = await bcryptjs.hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
