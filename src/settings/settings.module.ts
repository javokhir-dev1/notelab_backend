import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Settings } from './models/setting.model';
import { User } from '../users/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Settings, User])],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
