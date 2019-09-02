import { Direction, GameKey, ControlKey } from '../types/index'
import Game from '../game'
import { Snake } from '../objects'

export default class Controls {
  public static lastKey: number = null

  public static onKeyUp = (ev: KeyboardEvent): void => { Controls.lastKey = ev.keyCode }

  public static processInput(player: Snake): void {
    if (!Controls.lastKey) return

    switch (Controls.lastKey) {
      case ControlKey.START:
        break
      case ControlKey.PAUSE:
        break
      case ControlKey.RESET:
        break
      case GameKey.W:
      case GameKey.UP:
        if (player.direction !== Direction.DOWN) {
          player.direction = Direction.UP
        }
        break
      case GameKey.S:
      case GameKey.DOWN:
        if (player.direction !== Direction.UP) {
          player.direction = Direction.DOWN
        }
        break
      case GameKey.A:
      case GameKey.LEFT:
        if (player.direction !== Direction.RIGHT) {
          player.direction = Direction.LEFT
        }
        break
      case GameKey.D:
      case GameKey.RIGHT:
        if (player.direction !== Direction.LEFT) {
          player.direction = Direction.RIGHT
        }
        break
      case GameKey.SPACEBAR:
        player.jump()
        break
      default:
        break
    }

    Controls.lastKey = null
  }
}
