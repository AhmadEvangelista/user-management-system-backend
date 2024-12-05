import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  healthCheck(): string {
    return 'API is running';
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });

    if (existingUser) {
      throw new Error('Email or username already taken');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }
  }

  async updateUsername(id: number, newUsername: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }

    user.username = newUsername;

    return this.userRepository.save(user);
  }

  async changePassword(id: number, newPassword: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    return this.userRepository.save(user);
  }
}
