import { Module } from '@nestjs/common';

import { CloudinaryService } from '../storage/cloudinary.service';
import { PrismaService } from '../prisma.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService, CloudinaryService],
})
export class ProjectModule {}
