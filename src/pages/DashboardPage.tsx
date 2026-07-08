import { mockTickets } from '@/data/mock-tickets'
import { StatusBadge, PriorityBadge } from '@/components/ui/badges'
import { Ticket, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

const stats = [
  {
    label: 'Ticket Aperti',
    value: mockTickets.filter((t) => t.status === 'open').length,
    icon: Ticket,
    color: 'text-[#0070F2]',
    bg: 'bg-[#EFF6FF]',
  },
  {
    label: 'In Lavorazione',
    value: mockTickets.filter((t) => t.status === 'in_progress').length,
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    label: 'Risolti',
    value: mockTickets.filter((t) => t.status === 'resolved').length,
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    label: 'Critici',
    value: mockTickets.filter((t) => t.priority === 'critical').length,
    icon: AlertCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
]

const recent = mockTickets.slice(0, 4)

export function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#201F1E]">Dashboard</h1>
        <p className="text-sm text-[#605E5C] mt-1">Panoramica dei ticket e attività recenti</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-lg border border-[#EDEBE9] p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#201F1E]">{value}</p>
              <p className="text-xs text-[#605E5C]">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-[#EDEBE9]">
        <div className="px-6 py-4 border-b border-[#EDEBE9]">
          <h2 className="text-sm font-semibold text-[#201F1E]">Ticket Recenti</h2>
        </div>
        <div className="divide-y divide-[#EDEBE9]">
          {recent.map((ticket) => (
            <div
              key={ticket.id}
              className="px-6 py-4 flex items-center gap-4 hover:bg-[#F3F2F1] transition-colors cursor-pointer"
            >
              <span className="text-xs font-mono text-[#A19F9D] w-16 shrink-0">{ticket.id}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#201F1E] truncate">{ticket.title}</p>
                <p className="text-xs text-[#A19F9D] mt-0.5">
                  {ticket.reporter} · {new Date(ticket.createdAt).toLocaleDateString('it-IT')}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <PriorityBadge priority={ticket.priority} />
                <StatusBadge status={ticket.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
