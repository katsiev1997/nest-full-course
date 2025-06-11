import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MovieModule } from './movie/movie.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres', // лучше явно указать, не тянуть из ENV как строку
        host: configService.getOrThrow<string>('POSTGRES_HOST'),
        port: configService.getOrThrow<number>('POSTGRES_PORT'),
        username: configService.getOrThrow<string>('POSTGRES_USER'),
        password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
        database: configService.getOrThrow<string>('POSTGRES_DATABASE'),
        autoLoadEntities: true,
        synchronize: true, // ⚠️ только для dev
      }),
      inject: [ConfigService],
    }),
    MovieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
