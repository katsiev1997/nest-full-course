/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { StartsWith } from '../decorators/start-with.decorator';

export enum TaskTag {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @StartsWith('Task')
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
}
