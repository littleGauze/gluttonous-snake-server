export class Position {
  X: number
  Y: number

  public constructor(x: number, y: number) {
    this.X = x
    this.Y = y
  }

  public static copy(position: Position): Position {
    return new Position(position.X, position.Y)
  }

  public toJSON(): { X: number; Y: number } {
    return { X: this.X, Y: this.Y }
  }
}
