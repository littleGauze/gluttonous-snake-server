import Ioredis = require('ioredis')

export default (cfg: any): object => {
  const redis = new Ioredis({
    host: cfg.host,
    port: cfg.port
  })

  return {
    async get(sid: string): Promise<any> {
      const res = await promisify(redis.get.bind(redis))(sid)
      return JSON.parse(res)
    },

    async set(sid: string, session: string, ttl?: number, mode: string = 'NX'): Promise<boolean> {
      const res = await promisify(redis.set.bind(redis))(sid, session, 'EX', ttl, mode)
      return !!res
    },

    async destroy(sid: string): Promise<boolean> {
      const res = await promisify(redis.del.bind(redis))(sid)
      return !!res
    },
  }
}

function promisify(fn: any): any {
  return (...args: []): Promise<any> => (
    new Promise((resolve, reject): void => {
      fn(...args, (err: any, res: any): void => {
        if (err) {
          reject(err)
          return
        }
        resolve(res)
      })
    })
  )
}
