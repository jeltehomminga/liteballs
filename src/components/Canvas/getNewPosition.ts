import { Circle } from "../../types"

export const getNewPosition = (circle: Circle) => {
  if (!circle.hasHitFloor) {
    circle.gravitySpeed += circle.gravity
    circle.x += circle.speedX
    circle.y += circle.speedY + circle.gravitySpeed
  }
  return circle
}
