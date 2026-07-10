import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { MoveRight, Plus, Search } from 'lucide-react'
import { StatusBadge } from '@/components/ui/badges'
import { mockTickets, type Status, type Ticket } from '@/data/mock-tickets'
import { BackButton } from '@/components/ui/back-button'
import { getRequestTypeColor } from '@/lib/request-type'

type RequestTypeFilter =
  | 'all'
  | 'sposta-data'
  | 'non-conformita'
  | 'sollecito'
  | 'giacenza-articolo'
  | 'reso-merce'
  | 'variazione-prezzo'
  | 'blocco-ordine'
  | 'sblocco-ordine'
  | 'verifica-pagamento'
  | 'aggiornamento-anagrafica'
  | 'richiesta-fattura'
  | 'reclamo-trasporto'
  | 'priorita-consegna'
  | 'richiesta-documenti'
  | 'cambio-vettore'

const requestTypeTabs: { id: RequestTypeFilter; label: string }[] = [
  { id: 'all', label: 'Tutte' },
  { id: 'sposta-data', label: 'Sposta data' },
  { id: 'non-conformita', label: 'Non conformità' },
  { id: 'sollecito', label: 'Sollecito' },
  { id: 'giacenza-articolo', label: 'Giacenza articolo' },
  { id: 'reso-merce', label: 'Reso merce' },
  { id: 'variazione-prezzo', label: 'Variazione prezzo' },
  { id: 'blocco-ordine', label: 'Blocco ordine' },
  { id: 'sblocco-ordine', label: 'Sblocco ordine' },
  { id: 'verifica-pagamento', label: 'Verifica pagamento' },
  { id: 'aggiornamento-anagrafica', label: 'Aggiornamento anagrafica' },
  { id: 'richiesta-fattura', label: 'Richiesta fattura' },
  { id: 'reclamo-trasporto', label: 'Reclamo trasporto' },
  { id: 'priorita-consegna', label: 'Priorità consegna' },
  { id: 'richiesta-documenti', label: 'Richiesta documenti' },
  { id: 'cambio-vettore', label: 'Cambio vettore' },
]

const requestTypeFilterValue: Record<Exclude<RequestTypeFilter, 'all'>, string> = {
  'sposta-data': 'sposta data',
  'non-conformita': 'non conformita',
  sollecito: 'sollecito',
  'giacenza-articolo': 'giacenza articolo',
  'reso-merce': 'reso merce',
  'variazione-prezzo': 'variazione prezzo',
  'blocco-ordine': 'blocco ordine',
  'sblocco-ordine': 'sblocco ordine',
  'verifica-pagamento': 'verifica pagamento',
  'aggiornamento-anagrafica': 'aggiornamento anagrafica',
  'richiesta-fattura': 'richiesta fattura',
  'reclamo-trasporto': 'reclamo trasporto',
  'priorita-consegna': 'priorita consegna',
  'richiesta-documenti': 'richiesta documenti',
  'cambio-vettore': 'cambio vettore',
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function TicketListPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const statusFilter = (searchParams.get('status') as Status | 'all') ?? 'all'
  const [requestTypeFilter, setRequestTypeFilter] = useState<RequestTypeFilter>(
    (searchParams.get('type') as RequestTypeFilter | null) ?? 'all'
  )
  const [isSearchOpen, setIsSearchOpen] = useState(Boolean(search))
  const isSpecialLayout = statusFilter === 'open' || statusFilter === 'closed'

  useEffect(() => {
    const nextParams = new URLSearchParams()
    if (search) nextParams.set('q', search)
    if (statusFilter !== 'all') nextParams.set('status', statusFilter)
    if (requestTypeFilter !== 'all') nextParams.set('type', requestTypeFilter)
    setSearchParams(nextParams, { replace: true })
  }, [search, setSearchParams, statusFilter, requestTypeFilter])

  const filtered = mockTickets.filter((ticket) => {
    const normalizedRequestType = normalizeText(ticket.requestType ?? '')
    const matchRequestType =
      requestTypeFilter === 'all' ||
      normalizedRequestType.includes(requestTypeFilterValue[requestTypeFilter])
    const matchSearch =
      search === '' ||
      ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.id.toLowerCase().includes(search.toLowerCase()) ||
      ticket.customerName.toLowerCase().includes(search.toLowerCase()) ||
      (ticket.requestType ?? '').toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || ticket.status === statusFilter
    return matchSearch && matchStatus && matchRequestType
  })

  const pageTitle = statusFilter === 'open' ? 'Richieste aperte' : statusFilter === 'closed' ? 'Storico richieste' : 'Richieste'
  const pageSubtitle =
    statusFilter === 'open'
      ? 'Seleziona una richiesta per gestirla'
      : statusFilter === 'closed'
        ? 'Seleziona una richiesta chiusa per visualizzarla'
        : ''

  return (
    <div className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
      <div className="sticky top-14 z-20 bg-[#F8F9FA] pt-6">
        <div className={isSpecialLayout ? 'pb-4' : 'border-b border-[#EDEBE9] pb-4'}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BackButton />
              <div>
                <h1 className="text-3xl font-light text-[#323130]">{pageTitle}</h1>
                {pageSubtitle && <p className="mt-1 text-sm text-[#605E5C]">{pageSubtitle}</p>}
              </div>
            </div>
            <div />
          </div>
        </div>

        {/* Filter bar */}
        {isSpecialLayout ? (
          <div className="mt-4 px-1">
            <div className="relative">
              <div className="no-scrollbar flex items-center gap-6 overflow-x-auto text-sm">
                {requestTypeTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setRequestTypeFilter(tab.id)}
                    className={`shrink-0 border-b-2 px-1 py-3 ${
                      requestTypeFilter === tab.id ? 'border-[#009B9B] text-[#009B9B]' : 'border-transparent text-[#605E5C]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
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
        )}
      </div>

      {isSpecialLayout && (
        <button
          type="button"
          onClick={() => setIsSearchOpen((current) => !current)}
          className="fixed bottom-6 right-6 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#009B9B] text-white shadow-xl hover:bg-[#007575] sm:bottom-8 sm:right-8"
          title="Cerca"
        >
          <Search className="h-5 w-5" />
        </button>
      )}

      {isSpecialLayout && isSearchOpen && (
        <div className="fixed bottom-20 right-4 z-30 w-[min(320px,calc(100vw-2rem))] rounded-lg border border-[#EDEBE9] bg-white p-2 shadow-2xl sm:bottom-24 sm:right-8">
          <div className="flex items-center rounded-md border border-[#EDEBE9] px-2 text-[#605E5C] focus-within:border-[#009B9B]">
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
      )}

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
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 shrink-0 rounded-[2px]"
                      style={{ backgroundColor: getRequestTypeColor(ticket.requestType, '#A19F9D') }}
                    />
                    <p className="truncate text-sm font-medium text-[#323130]">{ticket.requestType ?? 'Richiesta'}</p>
                  </div>
                  <p className="mt-1 truncate text-xs text-[#605E5C]">{ticket.customerName}</p>
                  <p className="mt-0.5 text-xs text-[#A19F9D]">{new Date(ticket.createdAt).toLocaleDateString('it-IT')}</p>
                </div>
                <StatusBadge status={ticket.status} />
                <MoveRight className="h-4 w-4 shrink-0 text-[#A19F9D]" />
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
        <Link to={`/tickets/${ticket.id}`} className="inline-flex items-center gap-2 font-medium text-[#323130] hover:text-[#009B9B]">
          <span
            className="h-2 w-2 shrink-0 rounded-[2px]"
            style={{ backgroundColor: getRequestTypeColor(ticket.requestType, '#A19F9D') }}
          />
          <span>{ticket.requestType ?? 'Richiesta'}</span>
        </Link>
      </td>
      <td className="px-6 py-3 align-top text-[#323130]">{ticket.customerName}</td>
      <td className="px-6 py-3 align-top text-[#605E5C]">
        {new Date(ticket.createdAt).toLocaleDateString('it-IT')}
      </td>
      <td className="px-6 py-3 align-top">
        <StatusBadge status={ticket.status} />
      </td>
    </tr>
  )
}
