import { Body, Controller, Param, ParseIntPipe, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response } from "express"
import { CookieGetter } from '../common/decorators/cookie-getter.decorat';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Roles, UserRole } from 'src/app.contstants';
import { UserAuthGuard } from 'src/common/guards/user-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreatorGuard } from 'src/common/guards/creator.guard';

@Controller('adminauth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Roles(UserRole.ADMIN)
  @UseGuards(UserAuthGuard, RolesGuard, CreatorGuard)
  @Post("register")
  register(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.register(createAdminDto)
  }

  @Post("login")
  login(@Body() loginUserDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginUserDto, res)
  }

  @Post("logout")
  logout(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logout(refreshToken, res);
  }

  @Post(":id/refresh")
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
