import { Circle } from "../../types"
import { getIsCollided } from "./getIsCollided"

const initialCircle = {
  radius: 50,
  startAngle: 0,
  endAngle: 2 * Math.PI,
  isCollided: false,
  speedX: 0,
  speedY: 0,
  gravity: 2,
  gravitySpeed: 0,
  hasHitFloor: false,
  x: 40,
  y: 50,
  randomColor: "green",
}

const collidedCircles: Circle[] = [
  {
    radius: 50,
    isCollided: true,
    speedX: 0,
    speedY: 0,
    gravity: 2,
    gravitySpeed: 44,
    hasHitFloor: true,
    x: 443,
    y: 788.5,
    randomColor: "9b50cd",
  },
  {
    radius: 50,
    isCollided: true,
    speedX: 0,
    speedY: 0,
    gravity: 2,
    gravitySpeed: 44,
    hasHitFloor: true,
    x: 443,
    y: 788.5,
    randomColor: "7723d2",
  },
]

describe("get is collided", () => {
  test("will not colide with itself", () => {
    expect(getIsCollided([initialCircle], 0)).toBe(false)
  })

  test("will colide with other circle too close ", () => {
    expect(getIsCollided(collidedCircles, 1)).toBe(true)
  })
})
