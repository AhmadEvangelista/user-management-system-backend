import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Username',
    example: 'username',
  })
  @IsString()
  @MinLength(4, { message: 'Username must be at least 3 characters long' })
  @MaxLength(20, { message: 'Username cannot be longer than 20 characters' })
  username: string;

  @ApiProperty({
    description: 'Email',
    example: 'email',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'password',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/, {
    message: 'password too weak',
  })
  password: string;
}
