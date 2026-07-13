import { useSyncExternalStore } from 'react'

export type TicketListColumnKey = 'requestType' | 'assignee' | 'customerName' | 'createdAt' | 'status' | 'solleciti'
export type TicketListGroupingMode = 'none' | 'assignee' | 'requestType' | 'monthYear'

export const TICKET_LIST_COLUMN_ORDER: TicketListColumnKey[] = [
  'requestType',
  'assignee',
  'customerName',
  'createdAt',
  'solleciti',
  'status',
]

export const TICKET_LIST_COLUMN_LABELS: Record<TicketListColumnKey, string> = {
  requestType: 'Tipo richiesta',
  assignee: 'Presa in carico',
  customerName: 'Cliente',
  createdAt: 'Data',
  solleciti: 'Sollecito',
  status: 'Stato',
}

type TicketListColumnVisibility = Record<TicketListColumnKey, boolean>
interface TicketListCustomizationState {
  columns: TicketListColumnVisibility
  groupingMode: TicketListGroupingMode
  groupingYear: string
}

const STORAGE_KEY = 'keyfor-ticket-customization'

const DEFAULT_TICKET_LIST_COLUMNS: TicketListColumnVisibility = {
  requestType: true,
  assignee: true,
  customerName: true,
  createdAt: true,
  solleciti: true,
  status: true,
}

function hasAtLeastOneColumnVisible(value: TicketListColumnVisibility) {
  return TICKET_LIST_COLUMN_ORDER.some((key) => value[key])
}

function getDefaultCustomizationState(): TicketListCustomizationState {
  return {
    columns: { ...DEFAULT_TICKET_LIST_COLUMNS },
    groupingMode: 'none',
    groupingYear: '',
  }
}

function readTicketListCustomizationFromStorage(): TicketListCustomizationState {
  if (typeof window === 'undefined') return getDefaultCustomizationState()

  const rawValue = window.localStorage.getItem(STORAGE_KEY)
  if (!rawValue) return getDefaultCustomizationState()

  try {
    const parsed = JSON.parse(rawValue) as {
      columns?: Partial<TicketListColumnVisibility>
      groupingMode?: TicketListGroupingMode
      groupingYear?: string
    }
    const parsedColumns = parsed.columns ?? {}
    const nextValue: TicketListColumnVisibility = {
      requestType: parsedColumns.requestType ?? DEFAULT_TICKET_LIST_COLUMNS.requestType,
      assignee: parsedColumns.assignee ?? DEFAULT_TICKET_LIST_COLUMNS.assignee,
      customerName: parsedColumns.customerName ?? DEFAULT_TICKET_LIST_COLUMNS.customerName,
      createdAt: parsedColumns.createdAt ?? DEFAULT_TICKET_LIST_COLUMNS.createdAt,
      solleciti: parsedColumns.solleciti ?? DEFAULT_TICKET_LIST_COLUMNS.solleciti,
      status: parsedColumns.status ?? DEFAULT_TICKET_LIST_COLUMNS.status,
    }
    const nextGroupingMode: TicketListGroupingMode =
      parsed.groupingMode === 'assignee' ||
      parsed.groupingMode === 'requestType' ||
      parsed.groupingMode === 'monthYear'
        ? parsed.groupingMode
        : 'none'
    return {
      columns: hasAtLeastOneColumnVisible(nextValue) ? nextValue : { ...DEFAULT_TICKET_LIST_COLUMNS },
      groupingMode: nextGroupingMode,
      groupingYear: typeof parsed.groupingYear === 'string' ? parsed.groupingYear : '',
    }
  } catch {
    return getDefaultCustomizationState()
  }
}

function persistTicketListCustomization(value: TicketListCustomizationState) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}

let ticketListCustomizationState: TicketListCustomizationState = readTicketListCustomizationFromStorage()

const listeners = new Set<() => void>()

function emitTicketListColumnsChange() {
  listeners.forEach((listener) => listener())
}

function subscribeTicketListColumns(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getTicketListColumnsSnapshot() {
  return ticketListCustomizationState
}

export function useTicketListCustomization() {
  const customization = useSyncExternalStore(
    subscribeTicketListColumns,
    getTicketListColumnsSnapshot,
    getTicketListColumnsSnapshot
  )

  return {
    visibleColumns: customization.columns,
    groupingMode: customization.groupingMode,
    groupingYear: customization.groupingYear,
  }
}

export function setTicketListColumnVisibility(column: TicketListColumnKey, visible: boolean) {
  const nextColumns = { ...ticketListCustomizationState.columns, [column]: visible }
  if (!hasAtLeastOneColumnVisible(nextColumns)) return

  ticketListCustomizationState = { ...ticketListCustomizationState, columns: nextColumns }
  persistTicketListCustomization(ticketListCustomizationState)
  emitTicketListColumnsChange()
}

export function setTicketListGroupingMode(groupingMode: TicketListGroupingMode) {
  ticketListCustomizationState = { ...ticketListCustomizationState, groupingMode }
  persistTicketListCustomization(ticketListCustomizationState)
  emitTicketListColumnsChange()
}

export function setTicketListGroupingYear(groupingYear: string) {
  ticketListCustomizationState = { ...ticketListCustomizationState, groupingYear }
  persistTicketListCustomization(ticketListCustomizationState)
  emitTicketListColumnsChange()
}

export function resetTicketListGroupingMode() {
  ticketListCustomizationState = { ...ticketListCustomizationState, groupingMode: 'none' }
  persistTicketListCustomization(ticketListCustomizationState)
  emitTicketListColumnsChange()
}

export function resetTicketListCustomization() {
  ticketListCustomizationState = getDefaultCustomizationState()
  persistTicketListCustomization(ticketListCustomizationState)
  emitTicketListColumnsChange()
}
