import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateImageDto {
  @IsUrl()
  @IsNotEmpty()
  url!: string;
}

class CreateTechnologyDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsUrl()
  @IsOptional()
  icon?: string;
}

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

  @IsUrl()
  @IsNotEmpty()
  coverImage!: string;

  @IsUrl()
  @IsOptional()
  repoLink?: string;

  @IsUrl()
  @IsOptional()
  demoLink?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateImageDto)
  @IsOptional()
  images?: CreateImageDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTechnologyDto)
  @IsOptional()
  technologies?: CreateTechnologyDto[];
}
