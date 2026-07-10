import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { mockTickets } from '@/data/mock-tickets'
import {
  resetTicketListCustomization,
  setTicketListGroupingMode,
  setTicketListGroupingYear,
  setTicketListColumnVisibility,
  TICKET_LIST_COLUMN_LABELS,
  TICKET_LIST_COLUMN_ORDER,
  type TicketListGroupingMode,
  useTicketListCustomization,
} from '@/lib/ticket-list-customization'

interface UserProfileMenuProps {
  accentColor: string
  email?: string
  initials?: string
  onLogout: () => void
}

export function UserProfileMenu({
  accentColor,
  email = 'marco.rossi@keyfor.it',
  initials = 'MR',
  onLogout,
}: UserProfileMenuProps) {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [customizeOpen, setCustomizeOpen] = useState(false)
  const [groupingOpen, setGroupingOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { visibleColumns, groupingMode, groupingYear } = useTicketListCustomization()
  const statusParam = new URLSearchParams(location.search).get('status')
  const canCustomizeTicketList = location.pathname === '/tickets' && (statusParam === 'open' || statusParam === 'closed')
  const canUseAssigneeGrouping = statusParam === 'open'
  const availableYears = getAvailableYears(mockTickets)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        setCustomizeOpen(false)
        setGroupingOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    if (!canCustomizeTicketList) {
      setCustomizeOpen(false)
      setGroupingOpen(false)
    }
  }, [canCustomizeTicketList])

  useEffect(() => {
    if (!canUseAssigneeGrouping && groupingMode === 'assignee') {
      setTicketListGroupingMode('none')
    }
  }, [canUseAssigneeGrouping, groupingMode])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white select-none"
        style={{ backgroundColor: accentColor }}
        aria-label="Profilo utente"
        aria-expanded={open}
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-56 rounded-md border border-[#EDEBE9] bg-white p-3 shadow-xl">
          <p className="text-xs text-[#605E5C]">Account</p>
          <p className="mt-1 text-sm font-medium text-[#201F1E]">{email}</p>
          {canCustomizeTicketList && (
            <>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  setCustomizeOpen(true)
                }}
                className="mt-3 w-full rounded-md border border-[#EDEBE9] px-3 py-1.5 text-sm text-[#323130] hover:bg-[#F3F2F1]"
              >
                Personalizza
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  setGroupingOpen(true)
                }}
                className="mt-3 w-full rounded-md border border-[#EDEBE9] px-3 py-1.5 text-sm text-[#323130] hover:bg-[#F3F2F1]"
              >
                Raggruppamenti
              </button>
            </>
          )}
          <button
            type="button"
            onClick={onLogout}
            className="mt-3 w-full rounded-md border border-[#EDEBE9] px-3 py-1.5 text-sm text-[#323130] hover:bg-[#F3F2F1]"
          >
            Logout
          </button>
        </div>
      )}

      {customizeOpen && canCustomizeTicketList && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-lg border border-[#EDEBE9] bg-white p-5 shadow-2xl">
            <h2 className="text-lg font-semibold text-[#201F1E]">Personalizza campi</h2>
            <p className="mt-1 text-sm text-[#605E5C]">Scegli quali colonne mostrare nella lista ticket.</p>

            <div className="mt-4 space-y-2">
              {TICKET_LIST_COLUMN_ORDER.map((columnKey) => (
                <label key={columnKey} className="flex items-center justify-between gap-3 rounded-md border border-[#EDEBE9] px-3 py-2">
                  <span className="text-sm text-[#323130]">{TICKET_LIST_COLUMN_LABELS[columnKey]}</span>
                  <input
                    type="checkbox"
                    checked={visibleColumns[columnKey]}
                    onChange={(event) => setTicketListColumnVisibility(columnKey, event.target.checked)}
                    className="h-4 w-4 accent-[#009B9B]"
                  />
                </label>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={resetTicketListCustomization}
                className="rounded-md border border-[#EDEBE9] px-3 py-2 text-sm text-[#323130] hover:bg-[#F3F2F1]"
              >
                Ripristina
              </button>
              <button
                type="button"
                onClick={() => setCustomizeOpen(false)}
                className="rounded-md bg-[#009B9B] px-4 py-2 text-sm font-medium text-white hover:bg-[#007575]"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}

      {groupingOpen && canCustomizeTicketList && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-lg border border-[#EDEBE9] bg-white p-5 shadow-2xl">
            <h2 className="text-lg font-semibold text-[#201F1E]">Raggruppamenti</h2>
            <p className="mt-1 text-sm text-[#605E5C]">
              Scegli il tipo di raggruppamento della lista ticket.
            </p>

            <div className="mt-4 space-y-2">
              {(
                [
                  { key: 'none', label: 'Per tipologia (predefinito)' },
                  ...(canUseAssigneeGrouping ? [{ key: 'assignee', label: 'Per assegnazione' }] : []),
                  { key: 'monthYear', label: 'Per mese/anno' },
                ] as { key: TicketListGroupingMode; label: string }[]
              ).map((item) => (
                <label
                  key={item.key}
                  className="flex items-center justify-between gap-3 rounded-md border border-[#EDEBE9] px-3 py-2"
                >
                  <span className="text-sm text-[#323130]">{item.label}</span>
                  <input
                    type="radio"
                    name="ticket-list-grouping"
                    checked={groupingMode === item.key}
                    onChange={() => setTicketListGroupingMode(item.key)}
                    className="h-4 w-4 accent-[#009B9B]"
                  />
                </label>
              ))}
            </div>

            {groupingMode === 'monthYear' && (
              <div className="mt-4 rounded-md border border-[#EDEBE9] px-3 py-2">
                <label className="flex items-center justify-between gap-3">
                  <span className="text-sm text-[#323130]">Anno</span>
                  <select
                    value={groupingYear}
                    onChange={(event) => setTicketListGroupingYear(event.target.value)}
                    className="h-8 min-w-[110px] rounded-md border border-[#D2D0CE] bg-white px-2 text-sm text-[#323130] outline-none focus:border-[#009B9B]"
                  >
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            <div className="mt-5 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setGroupingOpen(false)}
                className="rounded-md bg-[#009B9B] px-4 py-2 text-sm font-medium text-white hover:bg-[#007575]"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function getAvailableYears(tickets: { createdAt: string }[]) {
  return Array.from(new Set(tickets.map((ticket) => new Date(ticket.createdAt).getFullYear().toString()))).sort((a, b) => Number(b) - Number(a))
}
