import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronRight, Plus, Search } from 'lucide-react'
import { StatusBadge } from '@/components/ui/badges'
import { mockTickets, type Status, type Ticket } from '@/data/mock-tickets'
import { BackButton } from '@/components/ui/back-button'
import { getRequestTypeColor } from '@/lib/request-type'
import { handleHorizontalMouseDragScroll, handleHorizontalWheelScroll } from '@/lib/horizontal-wheel-scroll'
import {
  TICKET_LIST_COLUMN_LABELS,
  TICKET_LIST_COLUMN_ORDER,
  setTicketListGroupingYear,
  useTicketListCustomization,
  type TicketListColumnKey,
} from '@/lib/ticket-list-customization'

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

type DynamicTab = { id: string; label: string }

const monthTabs: DynamicTab[] = [
  { id: '1', label: 'Gennaio' },
  { id: '2', label: 'Febbraio' },
  { id: '3', label: 'Marzo' },
  { id: '4', label: 'Aprile' },
  { id: '5', label: 'Maggio' },
  { id: '6', label: 'Giugno' },
  { id: '7', label: 'Luglio' },
  { id: '8', label: 'Agosto' },
  { id: '9', label: 'Settembre' },
  { id: '10', label: 'Ottobre' },
  { id: '11', label: 'Novembre' },
  { id: '12', label: 'Dicembre' },
]

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

function normalizeTabValue(value: string) {
  return normalizeText(value.replace(/-/g, ' '))
}

const specialColumnWidths: Record<TicketListColumnKey, string> = {
  requestType: '1fr',
  assignee: '220px',
  customerName: '1fr',
  createdAt: '140px',
  solleciti: '100px',
  status: '120px',
}

export function TicketListPage() {
  const navigate = useNavigate()
  const { visibleColumns, groupingMode, groupingYear } = useTicketListCustomization()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const statusFilter = (searchParams.get('status') as Status | 'all') ?? 'all'
  const [requestTypeFilter, setRequestTypeFilter] = useState<RequestTypeFilter>(
    (searchParams.get('type') as RequestTypeFilter | null) ?? 'all'
  )
  const [groupingTabFilter, setGroupingTabFilter] = useState('all')
  const [isSearchOpen, setIsSearchOpen] = useState(Boolean(search))
  const isSpecialLayout = statusFilter === 'open' || statusFilter === 'closed'
  const bypassTypeFilterForNonAssigned =
    groupingMode === 'assignee' && normalizeTabValue(groupingTabFilter) === normalizeText('Non assegnato')

  useEffect(() => {
    const nextParams = new URLSearchParams()
    if (search) nextParams.set('q', search)
    if (statusFilter !== 'all') nextParams.set('status', statusFilter)
    if (requestTypeFilter !== 'all') nextParams.set('type', requestTypeFilter)
    setSearchParams(nextParams, { replace: true })
  }, [search, setSearchParams, statusFilter, requestTypeFilter])

  const filteredByTypeAndSearch = mockTickets.filter((ticket) => {
    const normalizedRequestType = normalizeText(ticket.requestType ?? '')
    const matchRequestType =
      bypassTypeFilterForNonAssigned ||
      requestTypeFilter === 'all' ||
      normalizedRequestType.includes(requestTypeFilterValue[requestTypeFilter])
    const matchSearch =
      search === '' ||
      ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.id.toLowerCase().includes(search.toLowerCase()) ||
      ticket.customerName.toLowerCase().includes(search.toLowerCase()) ||
      (ticket.requestType ?? '').toLowerCase().includes(search.toLowerCase())
    const matchStatus =
      statusFilter === 'all' ||
      (statusFilter === 'open' ? ticket.status === 'open' || ticket.status === 'in_progress' : ticket.status === statusFilter)
    return matchSearch && matchStatus && matchRequestType
  })

  const pageTitle = statusFilter === 'open' ? 'Richieste aperte' : statusFilter === 'closed' ? 'Storico richieste' : 'Richieste'
  const pageSubtitle =
    statusFilter === 'open'
      ? 'Seleziona una richiesta per gestirla'
      : statusFilter === 'closed'
        ? 'Seleziona una richiesta chiusa per visualizzarla'
        : ''
  const configuredColumns = TICKET_LIST_COLUMN_ORDER.filter((columnKey) => visibleColumns[columnKey])
  const safeColumns: TicketListColumnKey[] =
    configuredColumns.length === 0 ? ['requestType', 'assignee', 'customerName', 'createdAt', 'status'] : configuredColumns
  const effectiveGroupingMode = statusFilter === 'closed' && groupingMode === 'assignee' ? 'none' : groupingMode
  const availableYears = getAvailableYears(mockTickets)
  const selectedGroupingYear = availableYears.includes(groupingYear) ? groupingYear : (availableYears[0] ?? '')
  const showNonAssignedTab = statusFilter !== 'closed'
  const groupingTabs = getGroupingTabs(filteredByTypeAndSearch, effectiveGroupingMode, mockTickets, showNonAssignedTab)
  const tabsForBar: DynamicTab[] = effectiveGroupingMode === 'none' ? requestTypeTabs : groupingTabs
  const specialColumns = safeColumns
  const specialGridTemplateColumns = specialColumns.map((columnKey) => specialColumnWidths[columnKey]).join(' ')
  const filtered = applyGroupingTabFilter(filteredByTypeAndSearch, effectiveGroupingMode, groupingTabFilter, selectedGroupingYear)
  const groupedSpecialTickets: { key: string; tickets: Ticket[] }[] = [{ key: 'all', tickets: filtered }]

  useEffect(() => {
    if (availableYears.length > 0 && !availableYears.includes(groupingYear)) {
      setTicketListGroupingYear(availableYears[0])
    }
  }, [availableYears, groupingYear])

  useEffect(() => {
    if (effectiveGroupingMode === 'none') {
      if (groupingTabFilter !== 'all') setGroupingTabFilter('all')
      return
    }

    if (effectiveGroupingMode === 'monthYear') {
      const monthTabIds = new Set(monthTabs.map((tab) => tab.id))
      if (!monthTabIds.has(groupingTabFilter)) {
        setGroupingTabFilter(monthTabs[0]?.id ?? '1')
      }
      return
    }

    const availableTabIds = new Set(tabsForBar.map((tab) => tab.id))
    if (!availableTabIds.has(groupingTabFilter)) {
      setGroupingTabFilter('all')
    }
  }, [effectiveGroupingMode, groupingTabFilter, tabsForBar])

  return (
    <div className="w-full px-4 pb-6 sm:px-6 lg:px-8">
      <div className="sticky top-14 z-20 bg-[#F8F9FA] pt-6">
        <div className={isSpecialLayout ? 'pb-4' : 'border-b border-[#EDEBE9] pb-4'}>
          <div className="flex items-start gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <BackButton className="mt-1 shrink-0" />
              <div className="min-w-0 space-y-1">
                <h1 className="truncate text-3xl font-light leading-tight text-[#323130]">{pageTitle}</h1>
                {pageSubtitle && <p className="text-sm leading-5 text-[#605E5C]">{pageSubtitle}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        {isSpecialLayout ? (
          <div className="mt-4 px-1">
            <div className="relative flex items-center gap-3">
              <div
                onWheel={handleHorizontalWheelScroll}
                onMouseMove={handleHorizontalMouseDragScroll}
                className="no-scrollbar flex min-w-0 flex-1 cursor-grab items-center gap-6 overflow-x-auto whitespace-nowrap scroll-smooth text-sm active:cursor-grabbing"
              >
                {tabsForBar.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      if (effectiveGroupingMode === 'none') {
                        setRequestTypeFilter(tab.id as RequestTypeFilter)
                      } else {
                        setGroupingTabFilter(tab.id)
                      }
                    }}
                    className={`shrink-0 border-b-2 px-1 py-3 ${
                      (effectiveGroupingMode === 'none' ? requestTypeFilter : groupingTabFilter) === tab.id
                        ? 'border-[#009B9B] text-[#009B9B]'
                        : 'border-transparent text-[#605E5C]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-px w-full bg-[#EDEBE9]" />
            <div className="h-4 w-full bg-[#F8F9FA]" />
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-[#EDEBE9] bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/request-type')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#EDEBE9] px-3 py-2 text-sm leading-none text-[#323130] hover:bg-[#F3F2F1]"
              >
                <Plus className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden sm:inline">Nuovo</span>
              </button>
              <div className="flex min-w-[220px] flex-1 items-center rounded-lg border border-[#EDEBE9] px-2 text-[#605E5C] focus-within:border-[#009B9B]">
                <Search className="h-3.5 w-3.5" />
                <input
                  type="text"
                  placeholder="Cerca ticket..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent px-2 py-2 text-base text-[#323130] outline-none sm:text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Desktop table header - inside sticky area */}
        {isSpecialLayout && (
          <div className="mt-0 hidden rounded-t-2xl border border-b-0 border-[#EDEBE9] bg-[#FAF9F8] md:block">
            <div className="grid px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C]" style={{ gridTemplateColumns: specialGridTemplateColumns }}>
              {specialColumns.map((columnKey) => (
                <span key={columnKey} className={columnKey === 'assignee' ? 'text-center' : ''}>
                  {TICKET_LIST_COLUMN_LABELS[columnKey]}
                </span>
              ))}
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
        <div className="fixed bottom-20 left-1/2 z-30 w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-[#EDEBE9] bg-white p-2 shadow-2xl sm:bottom-24">
          <div className="flex items-center rounded-md border border-[#EDEBE9] px-2 text-[#605E5C] focus-within:border-[#009B9B]">
            <Search className="h-3.5 w-3.5" />
            <input
              type="text"
              placeholder="Cerca ticket..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent px-2 py-2 text-base text-[#323130] outline-none sm:text-sm"
            />
          </div>
        </div>
      )}

      {/* Mobile list */}
      <div className="mt-0 rounded-2xl border border-[#EDEBE9] bg-white md:hidden">
        <div className="divide-y divide-[#EDEBE9]">
          {filtered.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-[#605E5C]">
              Nessun ticket trovato con i filtri selezionati.
            </div>
          ) : (
            filtered.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => navigate(`/tickets/${ticket.id}`)}
                className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-[#DEECF9]"
              >
                <div className="min-w-0 flex-1">
                  {safeColumns.includes('requestType') ? (
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 shrink-0 rounded-[2px]"
                        style={{ backgroundColor: getRequestTypeColor(ticket.requestType, '#A19F9D') }}
                      />
                      <p className="truncate text-sm font-medium text-[#323130]">{ticket.requestType ?? 'Richiesta'}</p>
                    </div>
                  ) : (
                    <p className="truncate text-sm font-medium text-[#323130]">{ticket.id}</p>
                  )}
                  {safeColumns.includes('customerName') && (
                    <p className="mt-1 truncate text-xs text-[#605E5C]">{ticket.customerName}</p>
                  )}
                  {safeColumns.includes('assignee') && ticket.status !== 'open' && (
                    <p className="mt-0.5 truncate text-xs text-[#605E5C]">
                      {ticket.assignee}
                    </p>
                  )}
                  {safeColumns.includes('createdAt') && (
                    <p className="mt-0.5 text-xs text-[#A19F9D]">{new Date(ticket.createdAt).toLocaleDateString('it-IT')}</p>
                  )}
                </div>
                {safeColumns.includes('status') && <StatusBadge status={ticket.status} />}
                <ChevronRight className="h-4 w-4 shrink-0 text-[#A19F9D]" />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Desktop table body - scrolls below sticky header */}
      {isSpecialLayout && (
        <div className="mt-0 hidden rounded-b-2xl border border-t-0 border-[#EDEBE9] bg-white md:block">
          <div className="divide-y divide-[#EDEBE9]">
            {filtered.length === 0 ? (
              <div className="px-6 py-16 text-center text-sm text-[#605E5C]">
                Nessun ticket trovato con i filtri selezionati.
              </div>
            ) : (
              groupedSpecialTickets.map((group) => (
                <div key={group.key}>
                  {group.tickets.map((ticket, index) => (
                    <Link
                      key={ticket.id}
                      to={`/tickets/${ticket.id}`}
                      className={`grid px-6 py-3 text-sm hover:bg-[#DEECF9] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FCFBFA]'}`}
                      style={{ gridTemplateColumns: specialGridTemplateColumns }}
                    >
                      {specialColumns.map((columnKey) => (
                        <span key={`${ticket.id}-${columnKey}`} className={columnKey === 'assignee' ? 'text-center text-[#605E5C]' : ''}>
                          {renderSpecialLayoutCell(ticket, columnKey)}
                        </span>
                      ))}
                    </Link>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Non-special layout table (legacy) */}
      {!isSpecialLayout && (
        <div className="mt-4 hidden rounded-2xl border border-[#EDEBE9] bg-white md:block">
          <table className="w-full text-sm">
            <thead className="bg-[#FAF9F8]">
              <tr>
                {safeColumns.map((columnKey) => (
                  <th
                    key={columnKey}
                    className={`px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#605E5C] ${
                      columnKey === 'assignee' ? 'text-center' : 'text-left'
                    }`}
                  >
                    {TICKET_LIST_COLUMN_LABELS[columnKey]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={safeColumns.length} className="px-6 py-16 text-center text-sm text-[#605E5C]">
                    Nessun ticket trovato con i filtri selezionati.
                  </td>
                </tr>
              ) : (
                filtered.map((ticket, index) => (
                  <TicketListRow key={ticket.id} ticket={ticket} index={index} activeColumns={safeColumns} />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

    </div>
  )
}

function SollecitiDots({ count }: { count: number }) {
  if (count === 0) return null
  const color = '#F59E0B'
  if (count <= 3) {
    return (
      <span className="flex items-center gap-0.5">
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
        ))}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-sm font-semibold text-[#323130]">{count}</span>
    </span>
  )
}

function renderSpecialLayoutCell(ticket: Ticket, columnKey: TicketListColumnKey) {
  if (columnKey === 'requestType') {
    return (
      <span className="flex items-center gap-2 font-medium text-[#323130]">
        <span
          className="h-2 w-2 shrink-0 rounded-[2px]"
          style={{ backgroundColor: getRequestTypeColor(ticket.requestType, '#A19F9D') }}
        />
        {ticket.requestType ?? 'Richiesta'}
      </span>
    )
  }
  if (columnKey === 'assignee') return ticket.status !== 'open' ? ticket.assignee : ''
  if (columnKey === 'customerName') return <span className="text-[#323130]">{ticket.customerName}</span>
  if (columnKey === 'createdAt') return <span className="text-[#605E5C]">{new Date(ticket.createdAt).toLocaleDateString('it-IT')}</span>
  if (columnKey === 'solleciti') return <SollecitiDots count={ticket.solleciti} />
  return <StatusBadge status={ticket.status} />
}

function getGroupingTabs(
  tickets: Ticket[],
  groupingMode: 'none' | 'assignee' | 'requestType' | 'monthYear',
  allTickets: Ticket[],
  showNonAssignedTab: boolean
): DynamicTab[] {
  if (groupingMode === 'none') return [{ id: 'all', label: 'Tutte' }]
  if (groupingMode === 'monthYear') return monthTabs
  if (groupingMode === 'assignee') {
    const assignees = Array.from(new Set(allTickets.map((ticket) => ticket.assignee.trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'it'))
    return [
      { id: 'all', label: 'Tutte' },
      ...(showNonAssignedTab ? [{ id: 'Non assegnato', label: 'Non assegnato' }] : []),
      ...assignees.map((value) => ({ id: value, label: value })),
    ]
  }

  const values = Array.from(
    new Set(
      tickets.map((ticket) => ticket.requestType ?? 'Richiesta')
    )
  )

  return [{ id: 'all', label: 'Tutte' }, ...values.map((value) => ({ id: value, label: value }))]
}

function applyGroupingTabFilter(
  tickets: Ticket[],
  groupingMode: 'none' | 'assignee' | 'requestType' | 'monthYear',
  groupingTabFilter: string,
  groupingYear: string
): Ticket[] {
  if (groupingMode === 'none' || groupingTabFilter === 'all') return tickets

  return tickets.filter((ticket) => {
    if (groupingMode === 'assignee') {
      if (normalizeTabValue(groupingTabFilter) === normalizeText('Non assegnato')) {
        return ticket.status === 'open'
      }
      const assigneeLabel = ticket.assignee.trim() === '' ? 'Non assegnato' : ticket.assignee
      return ticket.status === 'in_progress' && normalizeText(assigneeLabel) === normalizeTabValue(groupingTabFilter)
    }
    if (groupingMode === 'monthYear') {
      const date = new Date(ticket.createdAt)
      const selectedYear = Number(groupingYear)
      const selectedMonth = Number(groupingTabFilter)
      if (!selectedYear || !selectedMonth) return true
      return date.getFullYear() === selectedYear && date.getMonth() + 1 === selectedMonth
    }
    const requestTypeLabel = ticket.requestType ?? 'Richiesta'
    const normalizedRequestType = normalizeText(requestTypeLabel)
    const normalizedTab = normalizeTabValue(groupingTabFilter)
    return normalizedRequestType.includes(normalizedTab)
  })
}

function getAvailableYears(tickets: Ticket[]): string[] {
  return Array.from(new Set(tickets.map((ticket) => new Date(ticket.createdAt).getFullYear().toString()))).sort((a, b) => Number(b) - Number(a))
}

function TicketListRow({
  ticket,
  index,
  activeColumns,
}: {
  ticket: Ticket
  index: number
  activeColumns: TicketListColumnKey[]
}) {
  return (
    <tr className={`cursor-pointer hover:bg-[#DEECF9] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FCFBFA]'}`}>
      {activeColumns.map((columnKey) => {
        if (columnKey === 'requestType') {
          return (
            <td key={columnKey} className="px-6 py-3 align-top">
              <Link to={`/tickets/${ticket.id}`} className="inline-flex items-center gap-2 font-medium text-[#323130] hover:text-[#009B9B]">
                <span
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{ backgroundColor: getRequestTypeColor(ticket.requestType, '#A19F9D') }}
                />
                <span>{ticket.requestType ?? 'Richiesta'}</span>
              </Link>
            </td>
          )
        }

        if (columnKey === 'assignee') {
          return (
            <td key={columnKey} className="px-6 py-3 align-top text-center text-[#605E5C]">
              {ticket.status !== 'open' ? ticket.assignee : ''}
            </td>
          )
        }

        if (columnKey === 'customerName') {
          return (
            <td key={columnKey} className="px-6 py-3 align-top text-[#323130]">
              {ticket.customerName}
            </td>
          )
        }

        if (columnKey === 'createdAt') {
          return (
            <td key={columnKey} className="px-6 py-3 align-top text-[#605E5C]">
              {new Date(ticket.createdAt).toLocaleDateString('it-IT')}
            </td>
          )
        }

        if (columnKey === 'solleciti') {
          return (
            <td key={columnKey} className="px-6 py-3 align-top">
              <SollecitiDots count={ticket.solleciti} />
            </td>
          )
        }

        return (
          <td key={columnKey} className="px-6 py-3 align-top">
            <StatusBadge status={ticket.status} />
          </td>
        )
      })}
    </tr>
  )
}
