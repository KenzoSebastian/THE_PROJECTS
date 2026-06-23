import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile(file: any, folder = 'portfolio'): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) return reject(error);
          if (result) return resolve(result.secure_url);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
  async deleteFile(fileUrl: string): Promise<any> {
    try {
      if (!fileUrl) return;

      // Contoh URL: https://res.cloudinary.com/dszk8p57q/image/upload/v12345/the_projects/covers/abcde.png
      // Kita perlu mengambil: the_projects/covers/abcde
      const urlParts = fileUrl.split('/upload/');
      if (urlParts.length < 2) return;

      const publicIdWithExtension = urlParts[1].replace(/^v\d+\//, ''); // Hilangkan versi (v12345/)
      const publicId = publicIdWithExtension.substring(
        0,
        publicIdWithExtension.lastIndexOf('.'),
      ); // Hilangkan ekstensi (.png)

      return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });
      });
    } catch (err) {
      console.error(`Gagal menghapus file ${fileUrl} dari Cloudinary:`, err);
    }
  }
}
