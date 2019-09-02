import { GameObject, Position } from '../types/index'
import Snake from './snake'

export default class SnakeSegment implements GameObject {
  public static colors: string[] = [
    '#FF0000', '#FF9966',
    '#FFFA66', '#66FF66',
    '#66FFFD', '#6699FF',
    '#7966FF', '#F366FF'
  ]

  public clazz: string
  public position: Position
  public colorIndex: number = -1

  public constructor(position: Position) {
    this.clazz = 'SnakeSegment'
    this.position = position
  }

  public getColor(): string {
    const len: number = SnakeSegment.colors.length
    this.colorIndex++
    return SnakeSegment.colors[this.colorIndex % len]
  }

  public handleCollision(snake: Snake): void {
    snake.die()
  }

  public toJSON(): object {
    return {
      clazz: this.clazz,
      colorIndex: this.colorIndex,
      position: this.position.toJSON()
    }
  }
}
