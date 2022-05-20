import { MouseEventHandler, useEffect, useRef, useState } from "react"

type Circle = {
  x: number
  y: number
  radius: number
  startAngle: number
  endAngle: number
  randomColor: string | CanvasGradient | CanvasPattern
  isCollided: boolean
  hasHitFloor: boolean
  speedX: number
  speedY: number
  gravity: number
  gravitySpeed: number
}

const defaultCircle = {
  radius: 50,
  startAngle: 0,
  endAngle: 2 * Math.PI,
  isCollided: false,
  speedX: 0,
  speedY: 0,
  gravity: 2,
  gravitySpeed: 0,
  hasHitFloor: false,
}

const getNewPosition = (circle: Circle) => {
  circle.gravitySpeed += circle.gravity
  circle.x += circle.speedX
  if (!circle.hasHitFloor) circle.y += circle.speedY + circle.gravitySpeed
  return circle
}

const drawCircle = (
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

const getIsCollided = (circles: Circle[], currentCircleIndex: number) => {
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

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const circlesRef = useRef<Circle[]>([])
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d")
      if (renderCtx) setContext(renderCtx)
    }
    return () => context?.clearRect(0, 0, window.innerWidth, window.innerHeight)
  }, [context])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (context) {
        const newCircles = circlesRef.current.map((circle, i) => {
          const maxY = window.innerHeight - (window.innerHeight - 800)
          const hasHitFloor = maxY - circle.radius < circle.y
          const isCollided = getIsCollided(circlesRef.current, i)
          return {
            ...circle,
            isCollided,
            hasHitFloor,
          }
        })
        circlesRef.current = newCircles

        // clear the screen for redrawing if not all hit the floor
        if (!newCircles.every((circle) => circle.hasHitFloor)) {
          context.clearRect(0, 0, window.innerWidth, window.innerHeight)
          // draw each circle with new or same position
          newCircles.forEach((circle) => {
            // get new position if not hit floor yet
            const newCircle = circle.hasHitFloor
              ? circle
              : getNewPosition(circle)
            drawCircle(
              newCircle.x,
              newCircle.y,
              context,
              newCircle.randomColor,
              newCircle.isCollided
            )
          })
        }
      }
    }, 50)

    return () => clearInterval(intervalId)
  }, [context])

  const handleClick: MouseEventHandler = (e) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16)

    // subtract the space outside the canvas
    const outsideWidth = (window.innerWidth - 1000) / 2
    const outsideHeight = (window.innerHeight - 800) / 2

    const newCircle: Circle = {
      ...defaultCircle,
      x: e.clientX - outsideWidth,
      y: e.clientY - outsideHeight,
      randomColor,
    }

    circlesRef.current = [...circlesRef.current, newCircle]
  }

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={800}
      style={{ backgroundColor: "white" }}
      onMouseDown={handleClick}
    />
  )
}
