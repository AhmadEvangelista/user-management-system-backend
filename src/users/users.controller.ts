import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CsrfGuard } from 'src/csrf/csrf.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(CsrfGuard)
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get()
  healthCheck(@Req() req: Request): string {
    console.log('Request', req.headers);
    const csrfToken = req.headers['__host-psifi.x-csrf-token'];
    console.log('csrfToken', csrfToken);

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
