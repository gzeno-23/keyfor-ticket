import { cn } from '@/lib/utils'
import { getRequestTypeColor } from '@/lib/request-type'

interface RequestTypeLabelProps {
  label: string
  color?: string
  className?: string
  textClassName?: string
  lineClassName?: string
}

export function RequestTypeLabel({ label, color, className, textClassName, lineClassName }: RequestTypeLabelProps) {
  const lineColor = color ?? getRequestTypeColor(label)

  return (
    <div className={cn('inline-flex flex-col items-start', className)}>
      <span className={cn('text-sm text-[#605E5C]', textClassName)}>{label}</span>
      <span className={cn('mt-1 h-1 w-full rounded-full', lineClassName)} style={{ backgroundColor: lineColor }} />
    </div>
  )
}

