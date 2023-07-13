import redisClient from '../utils/redis'
import {
  getCredentialsFromAuth,
  getUserFromCredentials,
  generateAuthToken,
  getAuthToken,
  deleteAuthToken,
} from '../utils/auth'

export default class AuthController {
  /**
   * Sign-in the user by generating a new authentication token
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} The generated user authentication token
   */
  static async getConnect(req, res) {
    const { email, password } = getCredentialsFromAuth(req)

    if (!email || !password) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const user = await getUserFromCredentials(email, password)
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const token = await generateAuthToken(user)

    return res.status(200).json({ token })
  }

  /**
   * Sign-out the user based on the authentication token
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} nothing
   */
  static async getDisconnect(req, res) {
    const token = getAuthToken(req)

    const userId = await deleteAuthToken(token)
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    return res.status(204).end()
  }
}
