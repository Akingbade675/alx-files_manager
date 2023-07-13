import sha1 from 'sha1'
import { dbClient } from '../db/dbClient.js'
import { getAuthToken, getUserFromToken } from './auth.js'

export const findUserByEmail = async (email) => {
  const user = await dbClient.db.collection('users').findOne({ email })
  return user
}

export const createUser = async (email, password) => {
  const securePassword = sha1(password)
  const user = await dbClient.db
    .collection('users')
    .insertOne({ email, password: securePassword })
  return user
}

export const getCurrentUser = async (request) => {
  const token = getAuthToken(request)
  if (!token) return null

  const user = await getUserFromToken(token)
  if (!user) return null

  return user
}
