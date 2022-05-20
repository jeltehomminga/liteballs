import { Circle } from "../../types"

export const getIsCollided = (
  circles: Circle[],
  currentCircleIndex: number
) => {
  const currentCircle = circles[currentCircleIndex]
  let isCollided = false

  circles.forEach((circle, index) => {
    // don't need to check if it collides with itself
    if (index !== currentCircleIndex) {
      let dx = currentCircle.x - circle.x
      let dy = currentCircle.y - circle.y

      // calculate hypothenuse pythagoras
      let distance = Math.sqrt(dx * dx + dy * dy)
      const sumofRadii = currentCircle.radius + circle.radius
      if (distance < sumofRadii) isCollided = true
    }
  })
  return isCollided
}
