import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  List,
  PlusCircle,
  TrendingUp,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { mockTickets, type Priority, type Status } from '@/data/mock-tickets'
import { cn } from '@/lib/utils'

const statusLabel: Record<Status, string> = {
  open: 'Aperto',
  in_progress: 'In corso',
  resolved: 'Risolto',
  closed: 'Chiuso',
}

const priorityLabel: Record<Priority, string> = {
  low: 'Bassa',
  medium: 'Media',
  high: 'Alta',
  critical: 'Critica',
}

const recentTickets = [...mockTickets]
  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  .slice(0, 5)

export function DashboardPage() {
  const navigate = useNavigate()
  const open = mockTickets.filter((ticket) => ticket.status === 'open').length
  const inProgress = mockTickets.filter((ticket) => ticket.status === 'in_progress').length
  const resolved = mockTickets.filter((ticket) => ticket.status === 'resolved').length
  const critical = mockTickets.filter((ticket) => ticket.priority === 'critical').length

  const formattedDate = new Intl.DateTimeFormat('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-4 sm:px-6 sm:py-6">
      <section className="rounded-2xl bg-gradient-to-r from-[#009B9B] to-[#00B5B5] p-6 text-white shadow-[0_20px_45px_rgba(0,155,155,0.18)]">
        <p className="text-sm text-white/70">Benvenuto</p>
        <h1 className="mt-0.5 text-2xl font-semibold">Ciao, Marco 👋</h1>
        <p className="mt-1 text-sm text-white/70 capitalize">{formattedDate}</p>
      </section>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard
          label="Aperti"
          value={open}
          color="#009B9B"
          bg="#E6F5F5"
          icon={TrendingUp}
          onClick={() => navigate('/tickets?status=open')}
        />
        <KpiCard
          label="In corso"
          value={inProgress}
          color="#F7630C"
          bg="#FFF4E0"
          icon={Clock}
          onClick={() => navigate('/tickets?status=in_progress')}
        />
        <KpiCard
          label="Risolti"
          value={resolved}
          color="#107C10"
          bg="#DFF6DD"
          icon={CheckCircle2}
          onClick={() => navigate('/tickets?status=resolved')}
        />
        <KpiCard
          label="Critici"
          value={critical}
          color="#A4262C"
          bg="#FDF3F4"
          icon={AlertTriangle}
          onClick={() => navigate('/tickets?priority=critical')}
        />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-[#323130]">Azioni rapide</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <ActionButton icon={PlusCircle} label="Nuovo Ticket" sub="Apri segnalazione" to="/tickets/new" primary />
          <ActionButton icon={List} label="Gestisci Ticket" sub="Visualizza e modifica" to="/tickets" />
          <ActionButton icon={Clock} label="Storico" sub="Ticket risolti" to="/tickets?status=resolved" />
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#EDEBE9] bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-[#EDEBE9] px-4 py-4 sm:px-5">
          <div>
            <h2 className="text-sm font-semibold text-[#323130]">Ticket recenti</h2>
            <p className="mt-0.5 text-xs text-[#605E5C]">Gli aggiornamenti più recenti del team</p>
          </div>
          <Link to="/tickets" className="text-xs font-medium text-[#009B9B] hover:text-[#007575]">
            Vedi tutti
          </Link>
        </div>

        <div className="divide-y divide-[#EDEBE9]">
          {recentTickets.map((ticket) => (
            <Link
              key={ticket.id}
              to={`/tickets/${ticket.id}`}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[#F8F9FA] sm:px-5"
            >
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-[#323130]">{ticket.title}</p>
                <p className="mt-0.5 text-xs text-[#605E5C]">
                  {ticket.id} · {new Date(ticket.updatedAt).toLocaleDateString('it-IT')}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <StatusDot status={ticket.status} />
                <PriorityText priority={ticket.priority} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function KpiCard({
  label,
  value,
  color,
  bg,
  icon: Icon,
  onClick,
}: {
  label: string
  value: number
  color: string
  bg: string
  icon: typeof TrendingUp
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl border border-[#EDEBE9] bg-white p-4 text-left transition-shadow hover:shadow-md"
    >
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: bg }}>
        <Icon className="h-5 w-5" style={{ color }} />
      </div>
      <p className="text-2xl font-semibold text-[#323130]">{value}</p>
      <p className="mt-0.5 text-xs text-[#605E5C]">{label}</p>
    </button>
  )
}

function ActionButton({
  icon: Icon,
  label,
  sub,
  to,
  primary = false,
}: {
  icon: typeof PlusCircle
  label: string
  sub: string
  to: string
  primary?: boolean
}) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className={cn(
        'flex items-center gap-3 rounded-xl border p-4 text-left transition-all hover:shadow-md',
        primary ? 'border-[#009B9B] bg-[#009B9B] text-white' : 'border-[#EDEBE9] bg-white text-[#323130]'
      )}
    >
      <div
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
          primary ? 'bg-white/20' : 'bg-[#E6F5F5]'
        )}
      >
        <Icon className={cn('h-5 w-5', primary ? 'text-white' : 'text-[#009B9B]')} />
      </div>
      <div className="min-w-0">
        <p className={cn('text-sm font-semibold', primary ? 'text-white' : 'text-[#323130]')}>{label}</p>
        <p className={cn('text-xs', primary ? 'text-white/70' : 'text-[#605E5C]')}>{sub}</p>
      </div>
    </button>
  )
}

function StatusDot({ status }: { status: Status }) {
  const colorMap: Record<Status, string> = {
    open: 'bg-[#009B9B]',
    in_progress: 'bg-[#F7630C]',
    resolved: 'bg-[#107C10]',
    closed: 'bg-[#A19F9D]',
  }

  return (
    <div className="flex items-center gap-1.5">
      <span className={cn('h-2.5 w-2.5 rounded-full', colorMap[status])} />
      <span className="text-xs text-[#605E5C]">{statusLabel[status]}</span>
    </div>
  )
}

function PriorityText({ priority }: { priority: Priority }) {
  const colorMap: Record<Priority, string> = {
    low: 'text-[#605E5C]',
    medium: 'text-[#0078D4]',
    high: 'text-[#F7630C]',
    critical: 'text-[#A4262C]',
  }

  return <span className={cn('text-xs font-medium', colorMap[priority])}>{priorityLabel[priority]}</span>
}
