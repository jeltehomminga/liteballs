import { MouseEventHandler, useEffect, useRef, useState } from "react"
import { Circle } from "../../types"
import { drawCircle } from "./drawCircle"
import { getIsCollided } from "./getIsCollided"
import { getNewPosition } from "./getNewPosition"

const defaultCircle = {
  radius: 50,
  isCollided: false,
  speedX: 0,
  speedY: 0,
  gravity: 1,
  gravitySpeed: 0,
  hasHitFloor: false,
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
    let animationId: number
    const draw = () => {
      const haveAllHitFloor = circlesRef.current.every(
        (circle) => circle.hasHitFloor
      )
      if (context && !haveAllHitFloor) {
        const newCircles = circlesRef.current.map((circle, i, arr) => {
          const maxY = window.innerHeight - (window.innerHeight - 800)
          const hasHitFloor = maxY - circle.radius < circle.y
          const isCollided = getIsCollided(arr, i)
          return {
            ...circle,
            isCollided,
            hasHitFloor,
          }
        })
        circlesRef.current = newCircles

        // clear the screen for redrawing
        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
        // draw each circle with new or same position
        newCircles.forEach((circle) => {
          // get new position if not hit floor yet
          const newCircle = circle.hasHitFloor ? circle : getNewPosition(circle)
          drawCircle(
            newCircle.x,
            newCircle.y,
            context,
            newCircle.randomColor,
            newCircle.isCollided
          )
        })
      }

      animationId = window.requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationId)
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
