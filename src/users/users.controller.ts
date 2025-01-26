import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CsrfGuard } from 'src/csrf/csrf.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
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

  @Patch('/update-user-details/:id')
  @UseGuards(CsrfGuard)
  @UseGuards(AuthGuard('jwt'))
  updateUsername(
    @Param('id') id: string,
    @Body() newUserDetails: UpdateUserDetailsDto,
  ) {
    return this.usersService.updateUserDetails(+id, newUserDetails);
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
