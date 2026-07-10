import type { WheelEvent } from 'react'

export function handleHorizontalWheelScroll(event: WheelEvent<HTMLDivElement>) {
  const element = event.currentTarget
  const hasHorizontalOverflow = element.scrollWidth > element.clientWidth
  const isVerticalWheel = Math.abs(event.deltaY) > Math.abs(event.deltaX)

  if (!hasHorizontalOverflow || !isVerticalWheel) return

  event.preventDefault()
  element.scrollLeft += event.deltaY
}

