import type { WheelEvent } from 'react'

export function handleHorizontalWheelScroll(event: WheelEvent<HTMLDivElement>) {
  const element = event.currentTarget
  const hasHorizontalOverflow = element.scrollWidth > element.clientWidth
  const primaryDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY

  if (!hasHorizontalOverflow || primaryDelta === 0) return

  const maxScrollLeft = element.scrollWidth - element.clientWidth
  const canScrollLeft = primaryDelta < 0 && element.scrollLeft > 0
  const canScrollRight = primaryDelta > 0 && element.scrollLeft < maxScrollLeft

  if (!canScrollLeft && !canScrollRight) return

  event.preventDefault()
  const nextScrollLeft = element.scrollLeft + primaryDelta
  element.scrollLeft = Math.min(maxScrollLeft, Math.max(0, nextScrollLeft))
}
