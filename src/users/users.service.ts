import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  healthCheck(): string {
    return 'API is running';
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

  async updateUserDetails(id: number, newUserDetails: UpdateUserDetailsDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      console.log('newUserDetails', newUserDetails);

      // Dynamically update the fields
      if (newUserDetails.username) {
        user.username = newUserDetails.username;
      }
      if (newUserDetails.email) {
        user.email = newUserDetails.email;
      }

      // Save the updated user entity (including the ID)
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
