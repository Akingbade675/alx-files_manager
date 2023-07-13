import sha1 from 'sha1'
import { v4 as uuidv4 } from 'uuid'
import { ObjectId } from 'mongodb'
import dbClient from './utils/db'
import redisClient from './utils/redis'

/**
 * Retrieves email and password from the authorization header of a request object.
 * @param {} request request object
 * @returns {object} credentials
 */
export const getCredentialsFromAuth = (request) => {
  const authorization = request.headers.authorization
  if (!authorization) return null

  const encodedCredentials = authorization.split(' ')[1]
  if (!encodedCredentials) return null

  const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString(
    'utf-8'
  )

  const [email, password] = decodedCredentials.split(':')

  return { email, password }
}

/**
 * Gets user from email and password
 * @param {string} email email
 * @param {string} password password
 * @returns {} database user object
 */
export const getUserFromCredentials = async (email, password) => {
  const securePassword = sha1(password)
  const user = await dbClient.db
    .collection('users')
    .findOne({ email, password: securePassword })
  return user
}

/**
 * Generates authentication token for a user and cache it in Redis
 * @param {*} user database user object
 * @returns token string
 */
export const generateAuthToken = async (user) => {
  const token = uuidv4()
  const key = `auth_${token}`
  await redisClient.set(key, user._id.toString(), 86400)
  return token
}

/**
 * Retrieves the userId based on the authentication token
 * @param {string} token
 * @returns userId or null
 */
export const getUserIdFromToken = async (token) => {
  const key = `auth_${token}`
  const userId = await redisClient.get(key)
  if (!userId) return null
  return userId
}

export const getUserFromToken = async (token) => {
  const userId = await getUserIdFromToken(token)
  if (!userId) return null

  const user = await dbClient.db
    .collection('users')
    .findOne({ _id: ObjectId(userId) })
  return user
}

/**
 * Gets authentication token from request header
 * @param {object} request - request object
 * @returns token or null
 */
export const getAuthToken = (request) => {
  const token = request.headers['X-Token']
  if (!token) return null
  return token
}

/**
 * Deletes authentication token from Redis
 * @param {string} token - token
 * @returns userid or null
 */
export const deleteAuthToken = async (token) => {
  const userId = await getUserIdFromToken(token)
  if (userId) await redisClient.del(`auth_${token}`)

  return userId
}
