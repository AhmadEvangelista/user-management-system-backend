import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { databaseConfig } from './config/database';
import { CsrfController } from './csrf/csrf.controller';
import { AuthModule } from './auth/auth.module';
dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), UsersModule, AuthModule],
  controllers: [AppController, CsrfController],
  providers: [AppService],
})
export class AppModule {}
