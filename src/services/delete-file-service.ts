import { S3Storage } from '../utils/s3-storage'

export class DeleteFileService {
  async execute(filename: string) {
    const s3Storage = new S3Storage()

    await s3Storage.deleteFile(filename)
  }
}
