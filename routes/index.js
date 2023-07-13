import express from 'express'
import AppController from '../controllers/AppController'
import UsersController from '../controllersUsersController'
import AuthController from '../controllersAuthController'
import FilesController from '../controllersFilesController'

const router = express.Router()

router.get('/status', AppController.getStatus)
router.get('/stats', AppController.getStats)

router.post('/users', UsersController.postNew)
router.post('/users/me', UsersController.getMe)

router.get('/connect', AuthController.getConnect)
router.get('/disconnect', AuthController.getDisconnect)

router.post('/files', FilesController.postUpload)
router.get('/files/:id', FilesController.getShow)
router.get('/files', FilesController.getIndex)

router.get('/files/:id/publish', FilesController.putPublish)
router.get('/files/:id/unpublish', FilesController.putUnpublish)

router.get('/files/:id/data', FilesController.getFile)

export default router
