import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockTickets, type Status, type Priority } from '@/data/mock-tickets'
import { StatusBadge, PriorityBadge } from '@/components/ui/badges'
import { Search, PlusCircle, SlidersHorizontal } from 'lucide-react'

const statusOptions: { value: Status | 'all'; label: string }[] = [
  { value: 'all', label: 'Tutti' },
  { value: 'open', label: 'Aperti' },
  { value: 'in_progress', label: 'In Lavorazione' },
  { value: 'resolved', label: 'Risolti' },
  { value: 'closed', label: 'Chiusi' },
]

const priorityOptions: { value: Priority | 'all'; label: string }[] = [
  { value: 'all', label: 'Tutte' },
  { value: 'critical', label: 'Critica' },
  { value: 'high', label: 'Alta' },
  { value: 'medium', label: 'Media' },
  { value: 'low', label: 'Bassa' },
]

export function TicketListPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all')

  const filtered = mockTickets.filter((t) => {
    const matchSearch =
      search === '' ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || t.status === statusFilter
    const matchPriority = priorityFilter === 'all' || t.priority === priorityFilter
    return matchSearch && matchStatus && matchPriority
  })

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Ticket</h1>
          <p className="text-sm text-neutral-500 mt-1">{filtered.length} ticket trovati</p>
        </div>
        <button
          onClick={() => navigate('/tickets/new')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Nuovo Ticket
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 flex flex-wrap gap-3 items-center">
        <SlidersHorizontal className="w-4 h-4 text-neutral-400 shrink-0" />

        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Cerca ticket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as Status | 'all')}
          className="px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* Priority filter */}
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as Priority | 'all')}
          className="px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          {priorityOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">ID</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">Titolo</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">Priorità</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">Stato</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">Assegnatario</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-neutral-400 text-sm">
                  Nessun ticket trovato
                </td>
              </tr>
            ) : (
              filtered.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-neutral-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                >
                  <td className="px-6 py-4 font-mono text-neutral-400 text-xs">{ticket.id}</td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-neutral-800">{ticket.title}</span>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {ticket.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4"><PriorityBadge priority={ticket.priority} /></td>
                  <td className="px-6 py-4"><StatusBadge status={ticket.status} /></td>
                  <td className="px-6 py-4 text-neutral-500">{ticket.assignee || '—'}</td>
                  <td className="px-6 py-4 text-neutral-400 text-xs">
                    {new Date(ticket.createdAt).toLocaleDateString('it-IT')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
