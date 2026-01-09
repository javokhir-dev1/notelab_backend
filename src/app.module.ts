import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config"
import { SequelizeModule } from "@nestjs/sequelize"
import { UsersModule } from './users/users.module';
import { NotebooksModule } from './notebooks/notebooks.module';
import { NoteModule } from './notes/note.module';
import { SettingsModule } from './settings/settings.module';
import { UserAuthModule } from './userauth/auth.module';
import { AdminAuthModule } from './adminauth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      sync: { alter: true },
      synchronize: true,
    }),
    UsersModule,
    NotebooksModule,
    NoteModule,
    SettingsModule,
    UserAuthModule,
    AdminAuthModule
  ],
})

export class AppModule {}