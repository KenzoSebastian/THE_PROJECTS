import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    const { images, technologies, ...projectData } = createProjectDto;

    const existingProject = await this.prisma.project.findUnique({
      where: { slug: projectData.slug },
    });
    if (existingProject) {
      throw new ConflictException('Slug already exists! Use a unique slug.');
    }

    return this.prisma.project.create({
      data: {
        ...projectData,
        images: images ? { create: images } : undefined,
        technologies: technologies ? { create: technologies } : undefined,
      },
      include: {
        images: true,
        technologies: true,
      },
    });
  }

  async findAll(onlyPublished = false) {
    return this.prisma.project.findMany({
      where: onlyPublished ? { isPublished: true } : {},
      include: {
        images: { select: { id: true, url: true } },
        technologies: { select: { id: true, name: true, icon: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: { slug },
      include: {
        images: true,
        technologies: true,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with slug "${slug}" not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const { images, technologies, ...projectData } = updateProjectDto;

    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    return this.prisma.$transaction(async (tx) => {
      if (images) {
        await tx.image.deleteMany({ where: { projectId: id } });
      }

      if (technologies) {
        await tx.technology.deleteMany({ where: { projectId: id } });
      }

      return tx.project.update({
        where: { id },
        data: {
          ...projectData,
          images: images ? { create: images } : undefined,
          technologies: technologies ? { create: technologies } : undefined,
        },
        include: {
          images: true,
          technologies: true,
        },
      });
    });
  }

  async remove(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    await this.prisma.project.delete({ where: { id } });
    return {
      message: `Project with title "${project.title}" successfully deleted`,
    };
  }
}
