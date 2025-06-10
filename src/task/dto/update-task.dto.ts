/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'Task title is required' })
  @IsNotEmpty({ message: "Task title can't be empty" })
  @Length(3, 10, { message: 'Task title must be between 3 and 10 characters' })
  title: string;
  @IsBoolean({ message: 'Task completed is a boolean' })
  completed: boolean;
}
