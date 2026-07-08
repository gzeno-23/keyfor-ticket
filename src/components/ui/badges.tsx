import { cn } from '@/lib/utils'
import type { Priority, Status } from '@/data/mock-tickets'

const statusConfig: Record<Status, { label: string; className: string }> = {
  open: { label: 'Aperto', className: 'bg-blue-100 text-blue-700' },
  in_progress: { label: 'In Lavorazione', className: 'bg-yellow-100 text-yellow-700' },
  resolved: { label: 'Risolto', className: 'bg-green-100 text-green-700' },
  closed: { label: 'Chiuso', className: 'bg-neutral-100 text-neutral-500' },
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  low: { label: 'Bassa', className: 'bg-neutral-100 text-neutral-500' },
  medium: { label: 'Media', className: 'bg-blue-100 text-blue-600' },
  high: { label: 'Alta', className: 'bg-orange-100 text-orange-600' },
  critical: { label: 'Critica', className: 'bg-red-100 text-red-600' },
}

export function StatusBadge({ status }: { status: Status }) {
  const { label, className } = statusConfig[status]
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', className)}>
      {label}
    </span>
  )
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const { label, className } = priorityConfig[priority]
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', className)}>
      {label}
    </span>
  )
}
