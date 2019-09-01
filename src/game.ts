import { ClockTick, Timer, Direction, Speed, Drawable } from './types/index'
import { Coin, Snake, SpeedCoin } from './objects/index'
import { Board, Controls } from './ux/index'

enum GameDifficulty { EASY = 300, MEDIUM = 150, DIFFICULT = 50 }

export default class Game {
  public static clock: Timer
  public static player: Snake
  public static hiScore: number = 0
  public static isRunning: boolean = false
  public static coinCounter = 0
  public static dataCallback: Function

  public static init(dataCallback: Function): void {
    Game.dataCallback = dataCallback
    Game.ready(Game.dataCallback)
  }

  public static ready(dataCallback: Function): void {
    Board.init()

    Game.player = new Snake({ X: 0, Y: 0 })
    Game.player.direction = Direction.RIGHT
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
    Game.ready(Game.dataCallback)
  }

  public static onClockTick(callback: Function): () => void {
    return () => {
      Controls.processInput()
      Game.player.processTurn()

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
