import { ClockTick, Timer, Direction, Speed, Position } from './types/index'
import { Coin, Snake, SpeedCoin } from './objects/index'
import { Board, Controls } from './ux/index'

enum GameDifficulty { EASY = 300, MEDIUM = 150, DIFFICULT = 50 }

export default class Game {
  public static clock: Timer
  public static players: Array<Snake> = []
  public static hiScore: number = 0
  public static isRunning: boolean = false
  public static coinCounter = 0
  public static syncChannel: any

  public static init(): void {
    Game.ready()
  }

  public static ready(): void {
    Board.init()

    const dataCallback = throttle((data: any) => {
      Game.syncChannel && Game.syncChannel.emit('turn', { data })
    })
    Game.clock = new Timer(GameDifficulty.DIFFICULT, 0, Game.onClockTick(dataCallback))
  }

  public static start(): void {
    if (Game.isRunning) return
    if (Game.clock.isPaused) {
      Game.pause()
      return
    }

    Game.isRunning = true
    Game.clock.start()
  }

  public static pause(): void {
    if (Game.clock.isPaused) {
      Game.isRunning = true
      Game.clock.resume()
      return
    }

    Game.clock.pause()
    Game.isRunning = false
  }

  public static reset(): void {
    Game.clock && Game.clock.stop() // eslint-disable-line
    Game.isRunning = false
    Game.ready()
  }

  public static addPlayer(sync: any, socket: any): void {
    if (!Game.syncChannel) {
      Game.syncChannel = sync
      Game.init()
      Game.start()
    }
    const player = new Snake(new Position(0, 0))
    player.direction = Direction.RIGHT
    // if (!Game.players.find((p) => p.name === player.name)) {
    Game.players.push(player)
    // }
  }

  public static onClockTick(callback: Function): () => void {
    return (): void => {
      Game.players.forEach((p) => {
        // Controls.processInput(p)
        p.processTurn()
      })

      if (Game.clock.tick === ClockTick.EVEN) {
        ++Game.coinCounter
        if (Game.coinCounter >= 2) {
          Game.coinCounter = 0

          if (!Math.floor(Math.random() + 0.5)) {
            const probability = (Coin.coinsActive + 0.5) / 5
            if (!Math.floor(Math.random() + probability)) {
              if (!Math.floor(Math.random() + 0.5)) {
                const coin = Coin.createRandom()
                Board.placeAtRandom(coin)
              } else if (!Math.floor(Math.random() + 0.6)) {
                const speedUpCoin = new SpeedCoin(Speed.FAST)
                Board.placeAtRandom(speedUpCoin)
              } else {
                const speedDownCoin = new SpeedCoin(Speed.SLOW)
                Board.placeAtRandom(speedDownCoin)
              }
            }
          }
        }
      }

      callback(Board.getData())
    }
  }
}

// sync very 66ms, 15/second
function throttle(handle: Function): (data: any) => void {
  const interval = 2000
  let lastSyncAt = Date.now()
  return (data: any): void => {
    const now = Date.now()
    if (now - lastSyncAt > interval) {
      handle(data)
      lastSyncAt = now
    }
  }
}
