import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import mime from 'mime-types'
import filesCollection from '../utils/files'
import File from '../utils/files'
import { getCurrentUser } from '../utils/users'
import { fileQueue } from '../worker'

export default class FilesController {
  static async postUpload(req, res) {
    const user = await getCurrentUser(req)
    if (!user) return res.status(401).json({ error: 'Unauthorized' })

    const { name, type, parentId, data } = req.body
    if (!name) return res.status(400).json({ error: 'Missing name' })

    const types = ['folder', 'file', 'image']
    if (!type || !types.includes(type))
      return res.status(400).json({ error: 'Missing type' })

    if (!data && type !== 'folder')
      return res.status(400).json({ error: 'Missing data' })

    if (parentId) {
      const parent = null
      if (!parent) return res.status(400).json({ error: 'Parent not found' })

      if (parent.type !== 'folder')
        return res.status(400).json({ error: 'Parent is not a folder' })
    }

    const file = new File({ userId: user.id, ...req.body })
    const newFile = await file.save()
    if (newFile.type === 'image') {
      fileQueue.add({ fileId: newFile.id, userId: user.id })
    }

    return res.status(201).json(newFile)
  }

  static async getShow(req, res) {
    const user = await getCurrentUser(request)
    if (!user) return res.staus(401).json({ error: 'Unauthorized' })

    const { id } = req.params
    const file = await filesCollection.findUserFileById(user.id, id)
    if (!file) return res.status(404).json({ error: 'Not found' })

    return res.status(200).json(file)
  }

  static async getIndex(req, res) {
    const user = await getCurrentUser(request)
    if (!user) return res.staus(401).json({ error: 'Unauthorized' })

    const { parentId = 0, page = 0 } = req.query
    const files = await filesCollection.findUserFilesByParentId(
      user.id,
      parentId,
      page
    )
    return res.status(200).json(files)
  }

  static async putPublish(req, res) {
    const currentUser = await getCurrentUser(req)
    if (!currentUser) return res.status(401).json({ error: 'Unauthorized' })

    const { id } = req.params
    const file = await filesCollection.findUserFileById(currentUser.id, id)
    if (!file) return res.status(404).json({ error: 'Not found' })

    if (file.isPublic) return res.status(200).json(file)

    const result = await filesCollection.updateFileById(id, { isPublic: true })
    return res.status(200).json(result)
  }

  static async putUnpublish(req, res) {
    const currentUser = await getCurrentUser(req)
    if (!currentUser) return res.status(401).json({ error: 'Unauthorized' })

    const { id } = req.params
    const file = await filesCollection.findUserFileById(currentUser.id, id)
    if (!file) return res.status(404).json({ error: 'Not found' })

    if (!file.isPublic) return res.status(200).json(file)

    const result = await filesCollection.updateFileById(id, { isPublic: false })
    return res.status(200).json(result)
  }

  static async getFile(req, res) {
    const currentUser = await getCurrentUser(req)

    const { id } = req.params
    const { size } = req.query
    const file = await filesCollection.findFileById(id)
    if (!file) return res.status(404).json({ error: 'Not found' })

    if (!file.isPublic && (!currentUser || currentUser.id !== file.userId)) {
      return res.status(404).json({ error: 'Not found' })
    }

    if (file.type === 'folder')
      return res.status(400).json({ error: "A folder doesn't have content" })

    let filePath = file.localPath
    if (!Number.isNaN(size) && [500, 250, 100].includes(Number(size)))
      filePath += `_${size}`

    if (!existsSync(filePath))
      return res.status(404).json({ error: 'Not found' })

    const mimeType = mime.lookup(file.name)
    res.setHeader('Content-Type', mimeType)
    const data = await readFile(filePath)
    return res.status(200).send(data)
  }
}
