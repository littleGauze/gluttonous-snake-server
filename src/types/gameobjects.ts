import { Position } from './position'
import Snake from '../objects/snake'

export interface Drawable {
  position: Position
  toJSON: () => object
}

export interface PlayerObject extends Drawable {
  name: string
}

export interface GameObject extends Drawable {
  handleCollision(object: Snake): void
}

export interface TokenInfo {
  token: string
  expires: number
}
export interface User extends TokenInfo {
  name: string
}
