import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'coverImageFile', maxCount: 1 },
      { name: 'imageFiles', maxCount: 10 },
      { name: 'technologyIconFiles', maxCount: 10 },
    ]),
  )
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFiles()
    files: {
      coverImageFile?: any[];
      imageFiles?: any[];
      technologyIconFiles?: any[];
    },
  ) {
    const project = await this.projectService.create(
      createProjectDto,
      files?.coverImageFile?.[0],
      files?.imageFiles,
      files?.technologyIconFiles,
    );

    return {
      status: 'SUCCESS',
      message: 'Project created successfully',
      data: project,
    };
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOneBySlug(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
