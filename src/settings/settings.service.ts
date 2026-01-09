import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Settings } from './models/setting.model';
import { CreateSettingsDto } from './dto/create-setting.dto';
import { UpdateSettingsDto } from './dto/update-setting.dto';
import { User } from '../users/models/user.model';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings)
    private settingsModel: typeof Settings,

    @InjectModel(User)
    private userModel: typeof User,
  ) { }

  async create(dto: CreateSettingsDto) {
    const { user_id } = dto

    if (!user_id) {
      throw new BadRequestException("user is required")
    }

    const user = await this.userModel.findByPk(user_id)
    const isSettingExsists = await this.settingsModel.findOne({ where: { user_id } })

    if (!user) {
      throw new NotFoundException("user not found")
    }

    if (isSettingExsists) {
      throw new BadRequestException("Settings for this user have already been created")
    }

    return this.settingsModel.create(dto);
  }

  findAll() {
    return this.settingsModel.findAll();
  }

  async findOne(id: number) {
    const setting = await this.settingsModel.findByPk(id);
    if (!setting) throw new NotFoundException('Settings not found');
    return setting;
  }

  async update(id: number, dto: UpdateSettingsDto) {
    const { user_id } = dto

    if (user_id) {
      const user = await this.userModel.findByPk(user_id)

      if (!user) {
        throw new NotFoundException("user not found")
      }
    }
    const setting = await this.findOne(id);
    await setting.update(dto);
    return setting;
  }

  async remove(id: number) {
    const setting = await this.findOne(id);
    await setting.destroy();
    return { message: 'Settings deleted successfully' };
  }
}
