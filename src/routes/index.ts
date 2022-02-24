import { Router } from 'express'
import { UploadFileService } from '../services/upload-file-service'
import multer from 'multer'
import { multerConfig } from '../config/multer'
import { DeleteFileService } from '../services/delete-file-service'

const routes = Router()
const upload = multer(multerConfig)

routes.post('/', upload.single('image'), async (req, res) => {
  const { file } = req
  const uploadFileService = new UploadFileService()

  await uploadFileService.execute(file!);

  return res.send()
})

routes.delete('/:filename', async (req, res) => {
  const { filename } = req.params
  const deleteFileService = new DeleteFileService()

  await deleteFileService.execute(filename);

  return res.send()
})

export default routes
