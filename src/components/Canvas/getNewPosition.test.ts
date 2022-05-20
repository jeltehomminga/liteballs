import { Circle } from "../../types"
import { getNewPosition } from "./getNewPosition"

const circle = {
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

describe("test get new position", () => {
  let initialCircle: Circle
  beforeEach(() => {
    initialCircle = { ...circle }
  })

  test("adds initial gravity speed and y position based on gravity", () => {
    expect(getNewPosition(initialCircle)).toStrictEqual({
      ...initialCircle,
      gravitySpeed: 2,
      y: 52,
    })
  })
  test("gravity will accelerate when gravityspeed is set ", () => {
    expect(getNewPosition({ ...initialCircle, gravitySpeed: 2 })).toStrictEqual(
      {
        ...initialCircle,
        gravitySpeed: 4,
        y: 54,
      }
    )
  })
  test("circle will not move if already the floor ", () => {
    expect(
      getNewPosition({ ...initialCircle, hasHitFloor: true })
    ).toStrictEqual({ ...initialCircle, hasHitFloor: true })
  })
})
