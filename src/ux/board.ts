import { Drawable, Position, Direction } from '../types/index'

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
    const data: any = {}
    for (let cx = 0; cx < Board.width; cx++) {
      for (let cy = 0; cy < Board.height; cy++) {
        let obj: any = Board.grid[cx][cy]
        if (obj) {
          obj = obj.toJSON()
          if (obj.clazz !== 'SnakeSegment') {
            data[`${cx}-${cy}`] = obj
          }
        }
      }
    }
    return data
  }

  public static getRandomPointAndDirection(): [Direction, Position] {
    const direction = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT]
    const dir = Math.floor(Math.random() * direction.length)

    let point
    switch (dir) {
      case Direction.UP:
        point = new Position(Math.floor(Math.random() * Board.width), Board.height)
        break
      case Direction.DOWN:
        point = new Position(Math.floor(Math.random() * Board.width), 0)
        break
      case Direction.LEFT:
        point = new Position(Board.width, Math.floor(Math.random() * Board.height))
        break
      case Direction.RIGHT:
        point = new Position(0, Math.floor(Math.random() * Board.height))
        break
    }

    return [dir, point]
  }
}
