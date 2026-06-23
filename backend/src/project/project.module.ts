import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { CloudinaryService } from 'src/storage/cloudinary.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService, CloudinaryService],
})
export class ProjectModule {}
