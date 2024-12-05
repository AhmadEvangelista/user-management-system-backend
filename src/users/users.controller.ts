import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get()
  healthCheck(): string {
    return this.usersService.healthCheck();
  }

  @Put(':id/update-username')
  updateUsername(@Param('id') id: string, @Body() newUsername: string) {
    return this.usersService.updateUsername(+id, newUsername);
  }

  @Put(':id/change-password')
  changePassword(@Param('id') id: string, @Body() newPassword: string) {
    return this.usersService.changePassword(+id, newPassword);
  }
}
