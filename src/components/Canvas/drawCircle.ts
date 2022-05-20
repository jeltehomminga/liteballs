export const drawCircle = (
  x: number,
  y: number,
  context: CanvasRenderingContext2D,
  randomColor?: string | CanvasGradient | CanvasPattern,
  isCollided?: boolean
) => {
  context.beginPath()
  context.arc(x, y, 50, 0, 2 * Math.PI)
  context.fill()
  context.fillStyle = "#" + randomColor
  if (isCollided) {
    context.fillText("Collision!", x, y)
    context.font = "24px Comic Sans MS"
    context.textAlign = "center"
  }
  context.closePath()
}
