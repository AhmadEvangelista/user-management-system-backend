import { Controller, Get, Body, Param, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CsrfGuard } from 'src/csrf/csrf.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  healthCheck(): string {
    return this.usersService.healthCheck();
  }

  @Get(':id')
  @UseGuards(CsrfGuard)
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put('/update-username/:id')
  @UseGuards(CsrfGuard)
  @UseGuards(AuthGuard('jwt'))
  updateUsername(
    @Param('id') id: string,
    @Body() newUsername: UpdateUsernameDto,
  ) {
    return this.usersService.updateUsername(+id, newUsername);
  }

  @Put('/change-password/:id')
  @UseGuards(CsrfGuard)
  @UseGuards(AuthGuard('jwt'))
  changePassword(
    @Param('id') id: string,
    @Body() passwords: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(+id, passwords);
  }
}
