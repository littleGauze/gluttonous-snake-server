import { Position } from './position'
import Snake from '../objects/snake'

export interface Drawable {
  position: Position
}

export interface PlayerObject extends Drawable {
  name: string
}

export interface GameObject extends Drawable {
  handleCollision(object: Snake): void
}
