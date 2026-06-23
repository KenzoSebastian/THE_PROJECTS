import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CloudinaryService } from 'src/storage/cloudinary.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    dto: CreateProjectDto,
    coverFile?: any,
    imageFiles?: Record<string, any>[],
    techIconFiles?: any[],
  ) {
    const uploadedUrls: string[] = [];

    try {
      const existingProject = await this.prisma.project.findUnique({
        where: { slug: dto.slug },
      });
      if (existingProject) {
        throw new ConflictException('Slug already exists!');
      }

      let coverImageUrl = '';
      if (coverFile) {
        coverImageUrl = await this.cloudinaryService.uploadFile(
          coverFile,
          'the_projects/covers',
        );
        uploadedUrls.push(coverImageUrl);
      }

      const uploadedImages: { url: string }[] = [];
      if (imageFiles && imageFiles.length > 0) {
        for (const file of imageFiles) {
          const url = await this.cloudinaryService.uploadFile(
            file,
            'the_projects/gallery',
          );
          uploadedUrls.push(url);
          uploadedImages.push({ url });
        }
      }

      let techQueries: any[] = [];
      const rawTechName = dto.technologyNames;

      if (rawTechName) {
        const techNames: string[] = JSON.parse(rawTechName);

        for (let i = 0; i < techNames.length; i++) {
          const techName = techNames[i];

          const existingTech = await this.prisma.technology.findUnique({
            where: { name: techName },
          });

          let iconUrl = existingTech?.icon || null;

          if (!existingTech && techIconFiles && techIconFiles[i]) {
            iconUrl = await this.cloudinaryService.uploadFile(
              techIconFiles[i],
              'the_projects/tech_icons',
            );
            uploadedUrls.push(iconUrl);
          }

          techQueries.push({
            where: { name: techName },
            create: {
              name: techName,
              icon: iconUrl,
            },
          });
        }
      }

      const { isPublished, technologyNames, ...pureData } = dto;

      return await this.prisma.project.create({
        data: {
          ...pureData,
          coverImage: coverImageUrl,
          isPublished: String(isPublished) === 'true',
          images:
            uploadedImages.length > 0 ? { create: uploadedImages } : undefined,
          technologies:
            techQueries.length > 0
              ? { connectOrCreate: techQueries }
              : undefined,
        },
        include: {
          images: true,
          technologies: true,
        },
      });
    } catch (error) {
      console.error(
        'Terjadi error saat create project, memulai otomatis rollback asset...',
        error,
      );

      if (uploadedUrls.length > 0) {
        for (const url of uploadedUrls) {
          await this.cloudinaryService.deleteFile(url);
        }
        console.log(
          `Berhasil membersihkan ${uploadedUrls.length} file sampah dari Cloudinary.`,
        );
      }

      throw error;
    }
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

  async update(
    id: string,
    dto: UpdateProjectDto,
    coverFile?: any,
    imageFiles?: Record<string, any>[],
    techIconFiles?: any[],
  ) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { images: true, technologies: true },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    const uploadedUrls: string[] = [];

    try {
      let coverImageUrl = project.coverImage;
      if (coverFile) {
        if (project.coverImage) {
          await this.cloudinaryService.deleteFile(project.coverImage);
        }
        coverImageUrl = await this.cloudinaryService.uploadFile(
          coverFile,
          'the_projects/covers',
        );
        uploadedUrls.push(coverImageUrl);
      }
      const retainedImageIds: string[] = (dto as any).retainedImageIds
        ? JSON.parse((dto as any).retainedImageIds)
        : project.images.map((img) => img.id);

      const imagesToDelete = project.images.filter(
        (img) => !retainedImageIds.includes(img.id),
      );
      for (const img of imagesToDelete) {
        await this.cloudinaryService.deleteFile(img.url);
        await this.prisma.image.delete({ where: { id: img.id } });
      }

      const uploadedImages: { url: string }[] = [];
      if (imageFiles && imageFiles.length > 0) {
        for (const file of imageFiles) {
          const url = await this.cloudinaryService.uploadFile(
            file,
            'the_projects/gallery',
          );
          uploadedUrls.push(url);
          uploadedImages.push({ url });
        }
      }

      let techQueries: any[] = [];
      let shouldUpdateTechnologies = false;

      if (dto.technologyNames) {
        shouldUpdateTechnologies = true;
        const techNames: string[] = JSON.parse(dto.technologyNames);

        for (let i = 0; i < techNames.length; i++) {
          const techName = techNames[i];
          const existingTech = await this.prisma.technology.findUnique({
            where: { name: techName },
          });

          let iconUrl = existingTech?.icon || null;

          if (!existingTech && techIconFiles && techIconFiles[i]) {
            iconUrl = await this.cloudinaryService.uploadFile(
              techIconFiles[i],
              'the_projects/tech_icons',
            );
            uploadedUrls.push(iconUrl);
          }

          techQueries.push({
            where: { name: techName },
            create: { name: techName, icon: iconUrl },
          });
        }
      }

      const {
        isPublished,
        technologyNames,
        retainedImageIds: _,
        ...pureData
      } = dto;

      return await this.prisma.project.update({
        where: { id },
        data: {
          ...pureData,
          coverImage: coverImageUrl,
          ...(isPublished !== undefined && {
            isPublished: String(isPublished) === 'true',
          }),
          ...(uploadedImages.length > 0 && {
            images: {
              create: uploadedImages,
            },
          }),
          ...(shouldUpdateTechnologies && {
            technologies: {
              set: [],
              connectOrCreate: techQueries,
            },
          }),
        },
        include: {
          images: true,
          technologies: true,
        },
      });
    } catch (error) {
      console.error(
        'Terjadi error saat update project, membersihkan asset baru...',
        error,
      );
      if (uploadedUrls.length > 0) {
        for (const url of uploadedUrls) {
          await this.cloudinaryService.deleteFile(url);
        }
      }
      throw error;
    }
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
