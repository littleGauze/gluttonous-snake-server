import { Speed, Position, GameObject } from '../types/index'
import Coin from './coin'
import Snake from './snake'

export default class SpeedCoin implements GameObject {
  public static colors: string[] = ['#3366FF', '#FF1400']
  public static instances: { [index: number]: Coin } = {}
  public static itemsIndex: number = 0
  public static itemsActive: number = 0

  public index: number
  public color: string
  public speed: Speed
  public position: Position
  public clazz: string

  public constructor(speed: Speed) {
    this.clazz = 'SpeedCoin'
    this.speed = speed
    this.color = SpeedCoin.colors[speed]
    this.index = SpeedCoin.itemsIndex
    ++SpeedCoin.itemsIndex
    ++SpeedCoin.itemsActive
  }

  public handleCollision(snake: Snake): void {
    snake.setSpeed(this.speed)
    if (this.speed === Speed.FAST) {
      snake.points += 3
      snake.maxLength += 3
    } else {
      snake.points += 1
      snake.maxLength += 1
    }
    this.destroy()
  }

  public destroy(): void {
    delete SpeedCoin.instances[this.index]
    --SpeedCoin.itemsActive
  }

  public toJSON(): object {
    return {
      clazz: this.clazz,
      index: this.index,
      color: this.color,
      speed: this.speed
    }
  }
}
