import { GameObject, Position } from '../types/index'
import { Board } from '../ux/index'
import Snake from './snake'

export default class Coin implements GameObject {
  public static values: number[] = [200, 600, 800, 1000, 2000]
  public static instances: { [index: number]: Coin } = {}
  public static coinsIndex: number = 0
  public static coinsActive: number = 0

  public index: number
  public value: number
  public position: Position

  public constructor(value: number) {
    this.value = value
    this.index = Coin.coinsIndex
    ++Coin.coinsIndex
    ++Coin.coinsActive
  }

  public static createRandom(): Coin {
    return new Coin(Coin.values[Math.floor(Math.random() * Coin.values.length)])
  }

  public handleCollision(snake: Snake): void {
    snake.points += this.value
    snake.maxLength += 2
    this.destroy()
  }

  public destroy(): void {
    Board.removeObjectAt(this.position)
    delete Coin.instances[this.index]
    --Coin.coinsActive
  }
}
