import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronRight, Plus, Search } from 'lucide-react'
import { StatusBadge } from '@/components/ui/badges'
import { mockTickets, type Status, type Ticket } from '@/data/mock-tickets'
import { BackButton } from '@/components/ui/back-button'
import { RequestTypeLabel } from '@/components/ui/request-type-label'

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

export function TicketListPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const statusFilter = (searchParams.get('status') as Status | 'all') ?? 'all'

  useEffect(() => {
    const nextParams = new URLSearchParams()
    if (search) nextParams.set('q', search)
    if (statusFilter !== 'all') nextParams.set('status', statusFilter)
    setSearchParams(nextParams, { replace: true })
  }, [search, setSearchParams, statusFilter])

  const filtered = mockTickets.filter((ticket) => {
    const matchSearch =
      search === '' ||
      ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.id.toLowerCase().includes(search.toLowerCase()) ||
      ticket.customerName.toLowerCase().includes(search.toLowerCase()) ||
      (ticket.requestType ?? '').toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || ticket.status === statusFilter
    return matchSearch && matchStatus
  })

  const pageTitle = statusFilter === 'open' ? 'Richieste aperte' : 'Ticket'

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
      <div className="border-b border-[#EDEBE9] pb-4">
        <p className="text-xs uppercase tracking-[0.18em] text-[#605E5C]">Dashboard / Ticket</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <div className="flex items-start gap-3 sm:gap-4">
            <BackButton />
            <div>
              <h1 className="text-[28px] font-light text-[#323130]">{pageTitle}</h1>
              <p className="mt-1 text-sm text-[#605E5C]">{filtered.length} record visualizzati</p>
            </div>
          </div>
          <div />
        </div>
      </div>

      {/* Filter bar */}
      <div className="mt-4 rounded-2xl border border-[#EDEBE9] bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/request-type')}
            className="flex items-center gap-1 rounded-lg border border-[#EDEBE9] px-3 py-2 text-sm text-[#323130] hover:bg-[#F3F2F1]"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Nuovo</span>
          </button>
          <div className="flex min-w-[220px] flex-1 items-center rounded-lg border border-[#EDEBE9] px-2 text-[#605E5C] focus-within:border-[#009B9B]">
            <Search className="h-3.5 w-3.5" />
            <input
              type="text"
              placeholder="Cerca ticket..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent px-2 py-2 text-sm text-[#323130] outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[#EDEBE9] bg-white">
        {/* Mobile list */}
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
                  <RequestTypeLabel
                    label={ticket.requestType ?? 'Richiesta'}
                    className="max-w-full"
                    textClassName="text-sm font-medium text-[#323130]"
                    lineClassName="h-0.5"
                  />
                  <p className="mt-1 truncate text-xs text-[#605E5C]">{ticket.customerName}</p>
                  <p className="mt-0.5 text-xs text-[#A19F9D]">{new Date(ticket.createdAt).toLocaleDateString('it-IT')}</p>
                </div>
                <StatusBadge status={ticket.status} />
                <ChevronRight className="h-4 w-4 shrink-0 text-[#A19F9D]" />
              </div>
            ))
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#FAF9F8]">
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]">Tipo richiesta</th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]">Cliente</th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]">Data</th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]">Stato</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-sm text-[#605E5C]">
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
        <Link to={`/tickets/${ticket.id}`} className="inline-block hover:opacity-80">
          <RequestTypeLabel
            label={ticket.requestType ?? 'Richiesta'}
            textClassName="text-sm font-medium text-[#323130]"
            lineClassName="h-0.5"
          />
        </Link>
      </td>
      <td className="px-6 py-3 align-top text-[#323130]">{ticket.customerName}</td>
      <td className="px-6 py-3 align-top text-[#605E5C]">
        {new Date(ticket.createdAt).toLocaleDateString('it-IT')}
      </td>
      <td className={`px-6 py-3 align-top ${statusColor[ticket.status]}`}>{statusLabel[ticket.status]}</td>
    </tr>
  )
}
