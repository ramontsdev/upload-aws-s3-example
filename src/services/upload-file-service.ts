import { S3Storage } from '../utils/s3-storage'

export class UploadFileService {
  async execute(file: Express.Multer.File) {
    const s3Storage = new S3Storage()

    await s3Storage.saveFile(file.filename)
  }
}
