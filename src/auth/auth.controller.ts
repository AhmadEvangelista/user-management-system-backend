import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CsrfGuard } from 'src/csrf/csrf.guard';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UseGuards(CsrfGuard)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('/login')
  @UseGuards(CsrfGuard)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
