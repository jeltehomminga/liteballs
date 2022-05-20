export type Circle = {
  x: number
  y: number
  radius: number
  randomColor: string | CanvasGradient | CanvasPattern
  isCollided: boolean
  hasHitFloor: boolean
  speedX: number
  speedY: number
  gravity: number
  gravitySpeed: number
}
