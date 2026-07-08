import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronRight, Filter, Plus, Search } from 'lucide-react'
import { PriorityBadge, StatusBadge } from '@/components/ui/badges'
import { mockTickets, type Priority, type Status, type Ticket } from '@/data/mock-tickets'

const statusOptions: { value: Status | 'all'; label: string }[] = [
  { value: 'all', label: 'Tutti gli stati' },
  { value: 'open', label: 'Aperti' },
  { value: 'in_progress', label: 'In lavorazione' },
  { value: 'resolved', label: 'Risolti' },
  { value: 'closed', label: 'Chiusi' },
]

const priorityOptions: { value: Priority | 'all'; label: string }[] = [
  { value: 'all', label: 'Tutte le priorità' },
  { value: 'critical', label: 'Critica' },
  { value: 'high', label: 'Alta' },
  { value: 'medium', label: 'Media' },
  { value: 'low', label: 'Bassa' },
]

const statusLabel: Record<Status, string> = {
  open: 'Aperto',
  in_progress: 'In lavorazione',
  resolved: 'Risolto',
  closed: 'Chiuso',
}

const statusColor: Record<Status, string> = {
  open: 'text-[#009B9B]',
  in_progress: 'text-[#8A6E00]',
  resolved: 'text-[#107C10]',
  closed: 'text-[#605E5C]',
}

const priorityLabel: Record<Priority, string> = {
  low: 'Bassa',
  medium: 'Media',
  high: 'Alta',
  critical: 'Critica',
}

export function TicketListPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>(
    (searchParams.get('status') as Status | 'all') ?? 'all'
  )
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>(
    (searchParams.get('priority') as Priority | 'all') ?? 'all'
  )
  const [assigneeFilter, setAssigneeFilter] = useState(searchParams.get('assignee') ?? 'all')

  useEffect(() => {
    const nextParams = new URLSearchParams()

    if (search) nextParams.set('q', search)
    if (statusFilter !== 'all') nextParams.set('status', statusFilter)
    if (priorityFilter !== 'all') nextParams.set('priority', priorityFilter)
    if (assigneeFilter !== 'all') nextParams.set('assignee', assigneeFilter)

    setSearchParams(nextParams, { replace: true })
  }, [assigneeFilter, priorityFilter, search, setSearchParams, statusFilter])

  const filtered = mockTickets.filter((ticket) => {
    const matchSearch =
      search === '' ||
      ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || ticket.status === statusFilter
    const matchPriority = priorityFilter === 'all' || ticket.priority === priorityFilter
    const matchAssignee =
      assigneeFilter === 'all' ||
      (assigneeFilter === 'unassigned' ? !ticket.assignee : ticket.assignee === assigneeFilter)

    return matchSearch && matchStatus && matchPriority && matchAssignee
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
      <div className="border-b border-[#EDEBE9] pb-4">
        <p className="text-xs uppercase tracking-[0.18em] text-[#605E5C]">Dashboard / Ticket</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-light text-[#323130]">Ticket</h1>
            <p className="mt-1 text-sm text-[#605E5C]">{filtered.length} record visualizzati</p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[#EDEBE9] bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/tickets/new')}
            className="flex items-center gap-1 rounded-lg border border-[#EDEBE9] px-3 py-2 text-sm text-[#323130] hover:bg-[#F3F2F1]"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Nuovo</span>
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#EDEBE9] text-[#605E5C] hover:bg-[#F3F2F1]"
            title="Filtri"
          >
            <Filter className="h-3.5 w-3.5" />
          </button>
          <div className="flex min-w-[220px] flex-1 items-center rounded-lg border border-[#EDEBE9] px-2 text-[#605E5C] focus-within:border-[#009B9B]">
            <Search className="h-3.5 w-3.5" />
            <input
              type="text"
              placeholder="Cerca ticket"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent px-2 py-2 text-sm text-[#323130] outline-none"
            />
          </div>
          <span className="mx-1 hidden h-5 w-px bg-[#EDEBE9] lg:block" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Status | 'all')}
            className="min-w-[160px] rounded-lg border border-[#EDEBE9] bg-white px-3 py-2 text-sm text-[#323130] outline-none focus:border-[#009B9B]"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as Priority | 'all')}
            className="min-w-[160px] rounded-lg border border-[#EDEBE9] bg-white px-3 py-2 text-sm text-[#323130] outline-none focus:border-[#009B9B]"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            className="min-w-[180px] rounded-lg border border-[#EDEBE9] bg-white px-3 py-2 text-sm text-[#323130] outline-none focus:border-[#009B9B]"
          >
            <option value="all">Tutti gli assegnatari</option>
            <option value="unassigned">Non assegnati</option>
            <option value="Marco Rossi">Marco Rossi</option>
            <option value="Laura Conti">Laura Conti</option>
            <option value="Andrea Ferri">Andrea Ferri</option>
          </select>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[#EDEBE9] bg-white">
        <div className="divide-y divide-[#EDEBE9] md:hidden">
          {filtered.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-[#605E5C]">
              Nessun ticket trovato con i filtri selezionati.
            </div>
          ) : (
            filtered.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => navigate(`/tickets/${ticket.id}`)}
                className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-[#F3F2F1]"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#323130]">{ticket.title}</p>
                  <p className="mt-0.5 text-xs text-[#A19F9D]">{ticket.id}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StatusBadge status={ticket.status} />
                  <PriorityBadge priority={ticket.priority} />
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-[#A19F9D]" />
              </div>
            ))
          )}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[980px] text-sm">
          <thead>
            <tr className="bg-[#FAF9F8]">
              <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]">ID</th>
              <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]">Titolo</th>
              <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]">Segnalato da</th>
              <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]">Priorità</th>
              <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]">Stato</th>
              <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]">Assegnatario</th>
              <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]">Data</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center text-sm text-[#605E5C]">
                  Nessun ticket trovato con i filtri selezionati.
                </td>
              </tr>
            ) : (
              filtered.map((ticket, index) => (
                <TicketListRow key={ticket.id} ticket={ticket} index={index} />
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function TicketListRow({ ticket, index }: { ticket: Ticket; index: number }) {
  return (
    <tr className={index % 2 === 0 ? 'bg-white' : 'bg-[#FCFBFA]'}>
      <td className="px-6 py-3 align-top">
        <Link to={`/tickets/${ticket.id}`} className="font-medium text-[#009B9B] hover:text-[#007575]">
          {ticket.id}
        </Link>
      </td>
      <td className="px-6 py-3 align-top text-[#323130]">
        <div className="font-medium">{ticket.title}</div>
        <div className="mt-1 text-xs text-[#605E5C]">{ticket.tags.join(' · ')}</div>
      </td>
      <td className="px-6 py-3 align-top text-[#605E5C]">{ticket.reporter}</td>
      <td className="px-6 py-3 align-top text-[#605E5C]">{priorityLabel[ticket.priority]}</td>
      <td className={`px-6 py-3 align-top ${statusColor[ticket.status]}`}>{statusLabel[ticket.status]}</td>
      <td className="px-6 py-3 align-top text-[#605E5C]">{ticket.assignee || '—'}</td>
      <td className="px-6 py-3 align-top text-[#605E5C]">
        {new Date(ticket.createdAt).toLocaleDateString('it-IT')}
      </td>
    </tr>
  )
}
