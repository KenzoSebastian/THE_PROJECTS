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
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'coverImageFile', maxCount: 1 },
      { name: 'imageFiles', maxCount: 10 },
      { name: 'technologyIconFiles', maxCount: 10 },
    ]),
  )
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFiles()
    files: {
      coverImageFile?: any[];
      imageFiles?: any[];
      technologyIconFiles?: any[];
    },
  ) {
    const updatedProject = await this.projectService.update(
      id,
      updateProjectDto,
      files?.coverImageFile?.[0],
      files?.imageFiles,
      files?.technologyIconFiles,
    );

    return {
      status: 'SUCCESS',
      message: 'Project updated successfully',
      data: updatedProject,
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
