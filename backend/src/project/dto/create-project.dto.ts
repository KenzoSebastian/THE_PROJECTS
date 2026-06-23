import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsString()
  @IsOptional()
  repoLink?: string;

  @IsString()
  @IsOptional()
  demoLink?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsString()
  technologyNames!: string;
}
