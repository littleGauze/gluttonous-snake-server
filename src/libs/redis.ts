import shortid = require('shortid')
import { User, TokenInfo } from '../types/index'

const EXPIRES = 60 * 5

interface StoreApi {
  findUserByToken: (token: string) => Promise<User|null>
  setUser: (name: string) => Promise<User>
  deleteUserByToken: (token: string) => Promise<boolean>
}

export default (io: any, { store, ...opts }: any): StoreApi => {
  const key = opts.key || 'snake:'
  const prefix = opts.prefix || 'user:'

  const api = {
    async findUserByToken(token: string): Promise<User|null> {
      const sid = `${key}${prefix}${token}`
      const user = await store.get(sid)
      return user || null
    },

    async setUser(name: string): Promise<User> {
      const { token, expires } = generateTokenInfo()
      const sid = `${key}${prefix}${token}`
      const user = { name, token, expires }
      await store.set(sid, JSON.stringify(user), expires)
      return user
    },

    async updateUser(user: User): Promise<void> {
      const sid = `${key}${prefix}${user.token}`
      await store.set(sid, JSON.stringify(user), EXPIRES, 'XX')
    },

    async deleteUserByToken(token: string): Promise<boolean> {
      const sid = `${key}${prefix}${token}`
      const res = await store.destroy(sid)
      return !!res
    },
  }

  io.redisStore = api

  return api
}

function generateTokenInfo(): TokenInfo {
  const token = shortid.generate()
  const expires = EXPIRES
  return { token, expires }
}
