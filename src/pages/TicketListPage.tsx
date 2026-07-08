import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockTickets, type Status, type Priority } from '@/data/mock-tickets'
import { StatusBadge, PriorityBadge } from '@/components/ui/badges'
import { Search, PlusCircle, SlidersHorizontal } from 'lucide-react'

const statusOptions: { value: Status | 'all'; label: string }[] = [
  { value: 'all', label: 'Tutti gli stati' },
  { value: 'open', label: 'Aperti' },
  { value: 'in_progress', label: 'In Lavorazione' },
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#201F1E]">Ticket</h1>
          <p className="text-sm text-[#605E5C] mt-1">{filtered.length} ticket trovati</p>
        </div>
        <button
          onClick={() => navigate('/tickets/new')}
          className="flex items-center gap-2 px-4 py-2 bg-[#008272] text-white text-sm font-medium rounded-md hover:bg-[#006B5C] transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Nuovo Ticket
        </button>
      </div>

      <div className="bg-white rounded-lg border border-[#EDEBE9] p-4 flex flex-wrap gap-3 items-center">
        <SlidersHorizontal className="w-4 h-4 text-[#A19F9D] shrink-0" />
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A19F9D]" />
          <input
            type="text"
            placeholder="Cerca ticket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-[#EDEBE9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008272]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as Status | 'all')}
          className="px-3 py-2 text-sm border border-[#EDEBE9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008272] bg-white text-[#201F1E]"
        >
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as Priority | 'all')}
          className="px-3 py-2 text-sm border border-[#EDEBE9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008272] bg-white text-[#201F1E]"
        >
          {priorityOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg border border-[#EDEBE9] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#EDEBE9] bg-[#FAF9F8]">
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#605E5C] uppercase tracking-wide">ID</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#605E5C] uppercase tracking-wide">Titolo</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#605E5C] uppercase tracking-wide">Priorità</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#605E5C] uppercase tracking-wide">Stato</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#605E5C] uppercase tracking-wide">Assegnatario</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#605E5C] uppercase tracking-wide">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEBE9]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-[#A19F9D] text-sm">
                  Nessun ticket trovato
                </td>
              </tr>
            ) : (
              filtered.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-[#F3F2F1] cursor-pointer transition-colors"
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                >
                  <td className="px-6 py-4 font-mono text-[#A19F9D] text-xs">{ticket.id}</td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-[#201F1E]">{ticket.title}</span>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {ticket.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-[#F3F2F1] text-[#605E5C] px-1.5 py-0.5 rounded border border-[#EDEBE9]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4"><PriorityBadge priority={ticket.priority} /></td>
                  <td className="px-6 py-4"><StatusBadge status={ticket.status} /></td>
                  <td className="px-6 py-4 text-[#605E5C]">{ticket.assignee || '—'}</td>
                  <td className="px-6 py-4 text-[#A19F9D] text-xs">
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
