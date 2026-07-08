import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, TrendingUp, AlertTriangle, CheckCircle2, Clock, PlusCircle, ArrowRight } from 'lucide-react'
import { mockTickets } from '@/data/mock-tickets'

const open = mockTickets.filter((t) => t.status === 'open')
const inProgress = mockTickets.filter((t) => t.status === 'in_progress')
const resolved = mockTickets.filter((t) => t.status === 'resolved')
const closed = mockTickets.filter((t) => t.status === 'closed')
const critical = mockTickets.filter((t) => t.priority === 'critical')
const total = mockTickets.length

const recentTickets = [...mockTickets]
  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  .slice(0, 5)

const statusLabel: Record<string, string> = {
  open: 'Aperto', in_progress: 'In lavorazione', resolved: 'Risolto', closed: 'Chiuso',
}
const priorityLabel: Record<string, string> = {
  low: 'Bassa', medium: 'Media', high: 'Alta', critical: 'Critica',
}

function BcTile({ label, value, barColor, pct, onClick }: {
  label: string; value: number; barColor: string; pct: number; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-w-[140px] bg-[#009B9B] p-3 text-left text-white transition-colors hover:bg-[#007575] group"
    >
      <p className="truncate text-xs font-medium opacity-90">{label}</p>
      <p className="my-2 text-4xl font-light">{value}</p>
      <div className="mb-1.5 h-1 w-full bg-white/25">
        <div className="h-1 transition-all" style={{ width: `${pct}%`, backgroundColor: barColor }} />
      </div>
      <ChevronRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
    </button>
  )
}

export function DashboardPage() {
  const navigate = useNavigate()
  const pct = (n: number) => Math.max(10, Math.round((n / Math.max(total, 1)) * 100))

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-6 space-y-8">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#605E5C]">Role Center</p>
          <h1 className="mt-0.5 text-[28px] font-light text-[#323130]">Dashboard</h1>
        </div>
        <button
          type="button"
          onClick={() => navigate('/tickets/new')}
          className="flex items-center gap-2 bg-[#009B9B] px-4 py-2 text-sm font-medium text-white hover:bg-[#007575] transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          Nuovo Ticket
        </button>
      </div>

      {/* KPI summary strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#EDEBE9] border border-[#EDEBE9]">
        {[
          { label: 'Aperti', value: open.length, icon: TrendingUp, color: '#009B9B', bg: '#E6F5F5' },
          { label: 'In Lavorazione', value: inProgress.length, icon: Clock, color: '#F7630C', bg: '#FFF4E0' },
          { label: 'Risolti', value: resolved.length, icon: CheckCircle2, color: '#107C10', bg: '#DFF6DD' },
          { label: 'Critici', value: critical.length, icon: AlertTriangle, color: '#A4262C', bg: '#FDF3F4' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white px-5 py-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <div>
              <p className="text-2xl font-light text-[#323130]">{value}</p>
              <p className="text-xs text-[#605E5C]">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tiles BC + shortcut */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

        {/* Tiles */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[#323130]">Attività</h2>
              <Link to="/tickets" className="text-xs text-[#009B9B] hover:underline flex items-center gap-0.5">
                Vedi tutti <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Apertura */}
            <div className="mb-5">
              <p className="text-xs text-[#605E5C] mb-2 uppercase tracking-wide">Apertura</p>
              <div className="flex flex-wrap gap-2">
                <BcTile label="Ticket Aperti" value={open.length} barColor="#4CAF50" pct={pct(open.length)} onClick={() => navigate('/tickets?status=open')} />
                <BcTile label="Critici" value={critical.length} barColor="#F7630C" pct={pct(critical.length)} onClick={() => navigate('/tickets?priority=critical')} />
                <BcTile label="Non assegnati" value={mockTickets.filter(t => !t.assignee).length} barColor="#50E6FF" pct={pct(mockTickets.filter(t => !t.assignee).length)} onClick={() => navigate('/tickets')} />
              </div>
            </div>

            {/* In lavorazione */}
            <div className="mb-5">
              <p className="text-xs text-[#605E5C] mb-2 uppercase tracking-wide">In Lavorazione</p>
              <div className="flex flex-wrap gap-2">
                <BcTile label="In Progress" value={inProgress.length} barColor="#FFB900" pct={pct(inProgress.length)} onClick={() => navigate('/tickets?status=in_progress')} />
                <BcTile label="Alta Priorità" value={mockTickets.filter(t => t.priority === 'high').length} barColor="#FFD335" pct={pct(mockTickets.filter(t => t.priority === 'high').length)} onClick={() => navigate('/tickets?priority=high')} />
              </div>
            </div>

            {/* Risoluzione */}
            <div>
              <p className="text-xs text-[#605E5C] mb-2 uppercase tracking-wide">Risoluzione</p>
              <div className="flex flex-wrap gap-2">
                <BcTile label="Risolti" value={resolved.length} barColor="#92C353" pct={pct(resolved.length)} onClick={() => navigate('/tickets?status=resolved')} />
                <BcTile label="Chiusi" value={closed.length} barColor="#C8C6C4" pct={pct(closed.length)} onClick={() => navigate('/tickets?status=closed')} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions card */}
        <div className="bg-white border border-[#EDEBE9] h-fit">
          <div className="border-b border-[#EDEBE9] bg-[#FAF9F8] px-4 py-3">
            <p className="text-sm font-semibold text-[#323130]">Azioni rapide</p>
          </div>
          <div className="divide-y divide-[#EDEBE9]">
            {[
              { label: '+ Nuovo Ticket', to: '/tickets/new', teal: true },
              { label: 'Lista ticket aperti', to: '/tickets?status=open', teal: false },
              { label: 'Ticket critici', to: '/tickets?priority=critical', teal: false },
              { label: 'Ticket in lavorazione', to: '/tickets?status=in_progress', teal: false },
              { label: 'Storico risolti', to: '/tickets?status=resolved', teal: false },
            ].map(({ label, to, teal }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-[#F3F2F1] ${
                  teal ? 'font-medium text-[#009B9B]' : 'text-[#323130]'
                }`}
              >
                {label}
                <ChevronRight className="h-3.5 w-3.5 text-[#A19F9D]" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent tickets */}
      <div className="bg-white border border-[#EDEBE9]">
        <div className="border-b border-[#EDEBE9] bg-[#FAF9F8] px-5 py-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#323130]">Ticket Recenti</h2>
          <Link to="/tickets" className="text-xs text-[#009B9B] hover:underline">Vedi tutti →</Link>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAF9F8] text-left border-b border-[#EDEBE9]">
              {['ID', 'Titolo', 'Stato', 'Priorità', 'Aggiornato'].map(h => (
                <th key={h} className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentTickets.map((ticket, i) => (
              <tr key={ticket.id} className={`border-b border-[#EDEBE9] hover:bg-[#F3F2F1] transition-colors ${i % 2 === 1 ? 'bg-[#FCFBFA]' : 'bg-white'}`}>
                <td className="px-5 py-3">
                  <Link to={`/tickets/${ticket.id}`} className="font-medium text-[#009B9B] hover:text-[#007575] hover:underline">
                    {ticket.id}
                  </Link>
                </td>
                <td className="px-5 py-3 text-[#323130] max-w-xs truncate">{ticket.title}</td>
                <td className="px-5 py-3 text-[#605E5C]">{statusLabel[ticket.status]}</td>
                <td className="px-5 py-3 text-[#605E5C]">{priorityLabel[ticket.priority]}</td>
                <td className="px-5 py-3 text-[#605E5C] text-xs">{new Date(ticket.updatedAt).toLocaleDateString('it-IT')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
