/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export enum TaskTag {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  title: string;

  @IsString({ message: 'Task description is must be a string' })
  @IsOptional()
  description: string;

  @IsInt({ message: 'Task priority is must be a rounded number' })
  @IsPositive({ message: 'Task priority must be a positive number' })
  @IsOptional()
  priority: number;

  @IsArray({ message: 'Task tags must be an array' })
  @IsEnum(TaskTag, {
    message: 'Task tags must be one of the following: work, study, home',
    each: true,
  })
  @IsOptional()
  tags: TaskTag[];

  @IsString({ message: 'Task password is must be a string' })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;

  @IsUrl(
    {
      protocols: ['https', 'wss'],
      host_whitelist: ['google.com', 'localhost:3000'],
      host_blacklist: ['htmllessons.io'],
    },
    { message: 'Task websiteUrl is must be a valid URL' },
  )
  websiteUrl: string;

  @IsUUID('4', { message: 'Task userId is must be a valid UUID' })
  userId: string;
}
