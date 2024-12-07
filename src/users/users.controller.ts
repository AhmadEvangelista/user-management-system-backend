import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CsrfGuard } from 'src/csrf/csrf.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUsernameDto } from './dto/update-username.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  healthCheck(): string {
    return this.usersService.healthCheck();
  }

  @Post()
  @UseGuards(CsrfGuard)
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Get(':id')
  @UseGuards(CsrfGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put('/update-username/:id')
  @UseGuards(CsrfGuard)
  updateUsername(
    @Param('id') id: string,
    @Body() newUsername: UpdateUsernameDto,
  ) {
    return this.usersService.updateUsername(+id, newUsername);
  }

  @Put('/change-password/:id')
  @UseGuards(CsrfGuard)
  changePassword(
    @Param('id') id: string,
    @Body() passwords: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(+id, passwords);
  }
}
