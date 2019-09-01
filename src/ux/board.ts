import { Drawable, Position } from '../types/index'

const width = 600
const height = 400

export default class Board {
  public static bgColor: string = '#fff'
  public static gridColor: string = '#001F5C'

  public static blockSize = 8
  public static height = 0
  public static width = 0

  public static grid: Drawable[][]

  public static placeObject(object: Drawable, position: Position): void {
    Board.grid[position.X][position.Y] = object
    object.position = Position.copy(position)
  }

  public static removeObjectAt(position: Position): void {
    if (position) {
      Board.grid[position.X][position.Y] = null
    }
  }

  public static moveObject(object: Drawable, newPosition: Position): void {
    Board.removeObjectAt(object.position)
    Board.placeObject(object, newPosition)
  }

  public static placeAtRandom(object: Drawable): void {
    const position = Board.generateRandomPosition()
    Board.moveObject(object, position)
  }

  public static generateRandomPosition(): Position {
    let position: Position
    while (!position) {
      const x = Math.floor(Math.random() * Board.width)
      const y = Math.floor(Math.random() * Board.height)
      if (!Board.grid[x][y]) {
        position = new Position(x, y)
        break
      }
    }
    return position
  }

  public static init(): void {
    Board.height = height / Board.blockSize
    Board.width = width / Board.blockSize

    Board.grid = new Array(Board.width)
    for (let i = 0, j = Board.width; i !== j; i++) {
      Board.grid[i] = new Array(Board.height)
    }
  }

  public static getData(): Drawable[][] {
    return Board.grid
  }
}
