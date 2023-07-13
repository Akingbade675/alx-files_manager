import { mkdir, writeFile } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import { join } from 'path'
import { ObjectId } from 'mongodb'
import dbClient from './db'

const FOLDER = 'folder'
const FILE = 'file'
const IMAGE = 'image'
const FILE_TYPE = [FOLDER, FILE, IMAGE]
const FOLDER_PATH = process.env.FOLDER_PATH || '/tmp/files_manager'

class FilesCollection {
  constructor() {
    this.files = dbClient.db.collection('files')
  }

  async insertFile(file) {
    const result = await this.files.insertOne(file)
    const { _id, ...insertedFile } = result.ops[0]
    return { id: _id, ...insertedFile }
  }

  async findUserFiles(userId, parentId, page) {
    const limit = 20
    const skip = page * limit
    const query = { userId: ObjectId(userId), parentId: ObjectId(parentId) }
    const files = await this.files.find(query).limit(limit).skip(skip).toArray()
    return files
  }

  async findUserFilesByParentId(userId, parentId, page) {
    if (parentId === 0) return await this.findUserFiles(userId, parentId, page)

    if (ObjectId.isValid(parentId)) {
      const parent = await this.findFileById(parentId)
      if (!parent || parent.type !== FOLDER) return []

      return await this.findUserFiles(userId, parentId, page)
    }
  }

  async findFileById(id) {
    if (ObjectId.isValid(id)) {
      const file = await this.files.findOne({ _id: ObjectId(id) })
      return file
    }
    return null
  }

  async findUserFileById(userId, fileId) {
    if (ObjectId.isValid(fileId)) {
      const file = await this.files.findOne({ _id: ObjectId(fileId), userId })
      return file
    }
    return null
  }

  async updateFileById(id, data) {
    if (ObjectId.isValid(id)) {
      const result = await this.files.updateOne(
        { _id: ObjectId(id) },
        { $set: data }
      )
      return result
    }
    return null
  }
}

class File {
  constructor({ name, type, parentId = 0, isPublic = false, data, userId }) {
    this.name = name
    this.type = type
    this.parentId = parentId
    this.isPublic = isPublic
    this.data = data
    this.userId = userId
    this.filesCollection = new FilesCollection()
  }

  async save() {
    if (this.type === FOLDER) {
      return await this.filesCollection.insertFile({
        name: this.name,
        type: this.type,
        parentId: this.parentId,
        userId: this.userId,
      })
    }

    await mkdir(FOLDER_PATH, { recursive: true })
    const localPath = join(FOLDER_PATH, uuidv4())

    await writeFile(localPath, Buffer.from(this.data, 'base64'))
    return await filesCollection.insertFile({
      userId: this.userId,
      name: this.name,
      type: this.type,
      parentId: this.parentId,
      isPublic: this.isPublic,
      localPath,
    })
  }
}

const filesCollection = new FilesCollection()
export default filesCollection
