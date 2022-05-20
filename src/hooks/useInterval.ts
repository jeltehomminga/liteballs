import { useEffect, useRef } from "react"

export const useInterval = (callback: unknown, delay: unknown) => {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback as any
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      // @ts-ignore
      savedCallback.current()
    }
    if (delay !== null) {
      // @ts-ignore
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
