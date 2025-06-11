import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  releaseYear: number;
}
