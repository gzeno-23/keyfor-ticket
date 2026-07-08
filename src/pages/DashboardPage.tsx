import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { mockTickets, type Ticket } from '@/data/mock-tickets'

const totalTickets = Math.max(mockTickets.length, 1)

const statusLabel: Record<Ticket['status'], string> = {
  open: 'Aperto',
  in_progress: 'In lavorazione',
  resolved: 'Risolto',
  closed: 'Chiuso',
}

const priorityLabel: Record<Ticket['priority'], string> = {
  low: 'Bassa',
  medium: 'Media',
  high: 'Alta',
  critical: 'Critica',
}

const recentTickets = [...mockTickets]
  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  .slice(0, 5)

const tileGroups = [
  {
    title: 'Apertura',
    tiles: [
      { label: 'Ticket Aperti', value: mockTickets.filter((ticket) => ticket.status === 'open').length, barColor: '#4CAF50', query: '?status=open' },
      { label: 'Critici', value: mockTickets.filter((ticket) => ticket.priority === 'critical').length, barColor: '#F7630C', query: '?priority=critical' },
      { label: 'Non assegnati', value: mockTickets.filter((ticket) => !ticket.assignee).length, barColor: '#50E6FF', query: '?assignee=unassigned' },
    ],
  },
  {
    title: 'In Lavorazione',
    tiles: [
      { label: 'In Progress', value: mockTickets.filter((ticket) => ticket.status === 'in_progress').length, barColor: '#FFB900', query: '?status=in_progress' },
      { label: 'Alta Priorità', value: mockTickets.filter((ticket) => ticket.priority === 'high').length, barColor: '#FFD335', query: '?priority=high' },
    ],
  },
  {
    title: 'Risoluzione',
    tiles: [
      { label: 'Risolti', value: mockTickets.filter((ticket) => ticket.status === 'resolved').length, barColor: '#92C353', query: '?status=resolved' },
      { label: 'Chiusi', value: mockTickets.filter((ticket) => ticket.status === 'closed').length, barColor: '#C8C6C4', query: '?status=closed' },
    ],
  },
]

function BcTile({
  label,
  value,
  barColor,
  onClick,
}: {
  label: string
  value: number
  barColor: string
  onClick: () => void
}) {
  const barWidth = `${Math.max(14, Math.round((value / totalTickets) * 100))}%`

  return (
    <button
      type="button"
      onClick={onClick}
      className="min-w-[140px] bg-[#009B9B] p-3 text-left text-white transition-colors hover:bg-[#007575]"
    >
      <p className="truncate text-xs font-medium">{label}</p>
      <p className="my-2 text-4xl font-light">{value}</p>
      <div className="mb-1 h-1 w-full bg-white/30">
        <div className="h-1" style={{ width: barWidth, backgroundColor: barColor }} />
      </div>
      <ChevronRight className="h-4 w-4 opacity-60" />
    </button>
  )
}

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-6">
      <div className="mb-6 border border-[#EDEBE9] bg-white px-5 py-4">
        <p className="text-xs uppercase tracking-[0.18em] text-[#605E5C]">Role Center</p>
        <h1 className="mt-1 text-[28px] font-light text-[#323130]">Dashboard</h1>
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-[#323130]">Attività</h2>
          <p className="mt-1 text-sm text-[#605E5C]">Panoramica rapida delle code operative del team ticket.</p>
        </div>

        <div className="space-y-6">
          {tileGroups.map((group) => (
            <section key={group.title} className="space-y-3">
              <h3 className="text-sm font-semibold text-[#605E5C]">{group.title}</h3>
              <div className="flex flex-wrap gap-3">
                {group.tiles.map((tile) => (
                  <BcTile
                    key={tile.label}
                    label={tile.label}
                    value={tile.value}
                    barColor={tile.barColor}
                    onClick={() => navigate(`/tickets${tile.query}`)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="mt-10 border border-[#EDEBE9] bg-white">
        <div className="border-b border-[#EDEBE9] bg-[#FAF9F8] px-5 py-3">
          <h2 className="text-sm font-semibold text-[#323130]">Ticket Recenti</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAF9F8] text-left">
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]">ID</th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]">Titolo</th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]">Stato</th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]">Priorità</th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]">Aggiornato</th>
            </tr>
          </thead>
          <tbody>
            {recentTickets.map((ticket, index) => (
              <tr key={ticket.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FCFBFA]'}>
                <td className="px-5 py-3">
                  <Link to={`/tickets/${ticket.id}`} className="font-medium text-[#009B9B] hover:text-[#007575]">
                    {ticket.id}
                  </Link>
                </td>
                <td className="px-5 py-3 text-[#323130]">
                  <div className="font-medium">{ticket.title}</div>
                  <div className="mt-1 text-xs text-[#605E5C]">{ticket.reporter}</div>
                </td>
                <td className="px-5 py-3 text-[#605E5C]">{statusLabel[ticket.status]}</td>
                <td className="px-5 py-3 text-[#605E5C]">{priorityLabel[ticket.priority]}</td>
                <td className="px-5 py-3 text-[#605E5C]">
                  {new Date(ticket.updatedAt).toLocaleDateString('it-IT')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
