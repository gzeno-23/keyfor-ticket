export type Status = 'open' | 'in_progress' | 'resolved' | 'closed'

export const REQUEST_TYPES = [
  'Sollecito',
  'Sposta Data',
  'Non Conformità',
  'Giacenza Articolo',
  'Reso Merce',
  'Variazione Prezzo',
  'Blocco Ordine',
  'Sblocco Ordine',
  'Verifica Pagamento',
  'Aggiornamento Anagrafica',
  'Richiesta Fattura',
  'Reclamo Trasporto',
  'Priorità Consegna',
  'Richiesta Documenti',
  'Cambio Vettore',
] as const

export type RequestType = (typeof REQUEST_TYPES)[number]

export interface Ticket {
  id: string
  requestType?: RequestType
  customerName: string
  title: string
  description: string
  status: Status
  assignee: string
  reporter: string
  createdAt: string
  updatedAt: string
  tags: string[]
  solleciti: number
  isNew: boolean
}

const CUSTOMERS = [
  'Alfa Distribuzione S.r.l.',
  'Beta Forniture S.p.A.',
  'Gamma Logistica S.r.l.',
  'Delta Commerce S.r.l.',
  'Epsilon Trading S.p.A.',
  'Zeta Solutions S.r.l.',
  'Eta Group S.p.A.',
  'Theta Retail S.r.l.',
  'Iota Service S.r.l.',
  'Kappa Industrial S.p.A.',
]

const REPORTERS = [
  'Giulia Bianchi',
  'Marco Rossi',
  'Laura Conti',
  'Andrea Ferri',
  'Sara Mancini',
  'Paolo Vitale',
]

const ASSIGNEES = ['Marco Rossi', 'Laura Conti', 'Andrea Ferri', 'Sara Mancini']

const TAG_POOL = ['urgente', 'cliente', 'ordine', 'spedizione', 'documenti', 'supporto', 'priorita']

function buildDate(baseIndex: number, extraDays: number) {
  const month = baseIndex % 12
  const day = ((baseIndex * 3) % 27) + 1 + extraDays
  return new Date(Date.UTC(2026, month, day, 8 + (baseIndex % 9), 10 + (baseIndex % 40), 0)).toISOString()
}

function toTag(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(' ')[0]
}

function buildTicket(index: number, status: 'open' | 'in_progress' | 'closed'): Ticket {
  const serial = String(index + 1).padStart(3, '0')
  const requestType = REQUEST_TYPES[index % REQUEST_TYPES.length]
  const customerName = CUSTOMERS[index % CUSTOMERS.length]
  const reporter = REPORTERS[index % REPORTERS.length]
  const assignee = ASSIGNEES[index % ASSIGNEES.length]

  return {
    id: `KFT-${serial}`,
    requestType,
    customerName,
    title: `${requestType} #${serial}`,
    description: `Richiesta ${requestType.toLowerCase()} per ${customerName}. Verificare priorita, informazioni cliente e completare l'azione richiesta.`,
    status,
    assignee,
    reporter,
    createdAt: buildDate(index, 0),
    updatedAt: buildDate(index, status === 'closed' ? 2 : 1),
    tags: [toTag(requestType), TAG_POOL[index % TAG_POOL.length], TAG_POOL[(index + 3) % TAG_POOL.length]],
    solleciti: [0, 0, 1, 2, 0, 3, 1, 5, 0, 2, 0, 4, 1, 0, 2][index % 15],
    isNew: [true, true, false, true, false, false, true, false, true, false][index % 10],
  }
}

const openTickets: Ticket[] = Array.from({ length: 50 }, (_, index) =>
  buildTicket(index, index % 3 === 0 ? 'in_progress' : 'open')
)
const closedTickets: Ticket[] = Array.from({ length: 100 }, (_, index) => buildTicket(index + 50, 'closed'))

export const mockTickets: Ticket[] = [...openTickets, ...closedTickets]
