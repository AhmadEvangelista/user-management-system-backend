import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUsernameDto } from './dto/update-username.dto';

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
    try {
      const existingUser = await this.userRepository.findOne({
        where: [
          { email: createUserDto.email },
          { username: createUserDto.username },
        ],
      });

      if (existingUser) {
        throw new ConflictException('Email or username already taken');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = this.userRepository.create({
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
      });

      return this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      if (!user) {
        throw new NotFoundException('User not found');
      } else {
        return user;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUsername(id: number, newUsername: UpdateUsernameDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.username = newUsername.username;

      return this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async changePassword(
    id: number,
    passwords: { oldPassword: string; newPassword: string },
  ) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const match = await bcrypt.compare(passwords.oldPassword, user.password);
    if (!match) {
      throw new HttpException('Not Modified', HttpStatus.NOT_MODIFIED);
    }
    const hashedNewPassword = await bcrypt.hash(passwords.newPassword, 10);

    user.password = hashedNewPassword;

    return this.userRepository.save(user);
  }
}
