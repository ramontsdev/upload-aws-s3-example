import aws, { S3 } from 'aws-sdk'
import path from 'path';
import { multerConfig } from '../config/multer'
import fs from 'fs'

export class S3Storage {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1'
    })
  }

  async saveFile(filename: string): Promise<void> {
    const originalPath = path.resolve(multerConfig.directory, filename)

    const imageType = 'image/jpeg' //mime.getType(originalPath)
    const videoType = 'video/mp4'

    if (!imageType) {
      throw new Error('File not found')
    }

    const fileContent = await fs.promises.readFile(originalPath)

    this.client.putObject({
      Bucket: 'mais-outro-para-upload',
      Key: filename,
      ACL: 'public-read',
      Body: fileContent,
      ContentType: videoType
    })
      .promise()

    await fs.promises.unlink(originalPath)
  }

  async deleteFile(filename: string): Promise<void> {
    this.client.deleteObject({
      Bucket: 'mais-outro-para-upload',
      Key: filename,
    })
      .promise()
  }
}
