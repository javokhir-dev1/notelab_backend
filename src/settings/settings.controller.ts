import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingsDto } from './dto/create-setting.dto';
import { UpdateSettingsDto } from './dto/update-setting.dto';
import { Roles, UserRole } from 'src/app.contstants';
import { UserAuthGuard } from 'src/common/guards/user-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { SelfGuard } from 'src/common/guards/self.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) { }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Post()
  create(@Body() createSettingDto: CreateSettingsDto) {
    return this.settingsService.create(createSettingDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Get()
  findAll() {
    return this.settingsService.findAll();
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Get('user/:id/setting/:settingId')
  findOne(@Param('settingId') id: string) {
    return this.settingsService.findOne(+id);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Put('user/:id/setting/:settingId')
  update(@Param('settingId') id: string, @Body() updateSettingDto: UpdateSettingsDto) {
    return this.settingsService.update(+id, updateSettingDto);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(UserAuthGuard, RolesGuard, SelfGuard)
  @Delete('user/:id/setting/:settingId')
  remove(@Param('settingId') id: string) {
    return this.settingsService.remove(+id);
  }
}
