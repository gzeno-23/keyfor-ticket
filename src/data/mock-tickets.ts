export type Status = 'open' | 'in_progress' | 'resolved' | 'closed'

export interface Ticket {
  id: string
  requestType?: 'Sposta Data' | 'Non Conformità' | 'Sollecito' | 'Giacenza Articolo'
  customerName: string
  title: string
  description: string
  status: Status
  assignee: string
  reporter: string
  createdAt: string
  updatedAt: string
  tags: string[]
}

export const mockTickets: Ticket[] = [
  {
    id: 'KFT-001',
    requestType: 'Sollecito',
    customerName: 'Alfa Distribuzione S.r.l.',
    title: 'Impossibile accedere al portale clienti',
    description: 'Gli utenti riportano un errore 403 quando tentano di accedere al portale clienti dopo il recente aggiornamento.',
    status: 'open',
    assignee: 'Marco Rossi',
    reporter: 'Giulia Bianchi',
    createdAt: '2026-07-07T09:30:00Z',
    updatedAt: '2026-07-07T11:00:00Z',
    tags: ['accesso', 'portale', 'urgente'],
  },
  {
    id: 'KFT-002',
    requestType: 'Non Conformità',
    customerName: 'Beta Forniture S.p.A.',
    title: 'Esportazione report PDF non funziona',
    description: 'Il pulsante "Esporta PDF" nella sezione report non genera il file correttamente, mostra una pagina vuota.',
    status: 'in_progress',
    assignee: 'Laura Conti',
    reporter: 'Andrea Ferri',
    createdAt: '2026-07-06T14:00:00Z',
    updatedAt: '2026-07-07T08:45:00Z',
    tags: ['report', 'pdf', 'export'],
  },
  {
    id: 'KFT-003',
    requestType: 'Giacenza Articolo',
    customerName: 'Gamma Logistica S.r.l.',
    title: 'Aggiornare logo aziendale',
    description: 'Il logo nella navbar deve essere sostituito con la nuova versione fornita dal team marketing.',
    status: 'open',
    assignee: '',
    reporter: 'Sara Mancini',
    createdAt: '2026-07-05T10:00:00Z',
    updatedAt: '2026-07-05T10:00:00Z',
    tags: ['ui', 'branding'],
  },
  {
    id: 'KFT-004',
    requestType: 'Sposta Data',
    customerName: 'Delta Commerce S.r.l.',
    title: 'Lentezza nel caricamento della dashboard',
    description: 'La dashboard impiega oltre 8 secondi a caricarsi. Necessaria ottimizzazione query o caching.',
    status: 'in_progress',
    assignee: 'Marco Rossi',
    reporter: 'Paolo Vitale',
    createdAt: '2026-07-04T16:30:00Z',
    updatedAt: '2026-07-07T09:00:00Z',
    tags: ['performance', 'dashboard'],
  },
  {
    id: 'KFT-005',
    requestType: 'Sollecito',
    customerName: 'Epsilon Trading S.p.A.',
    title: 'Errore invio email di notifica',
    description: 'Le email di notifica per i nuovi ticket non vengono inviate agli assegnatari.',
    status: 'resolved',
    assignee: 'Laura Conti',
    reporter: 'Marco Rossi',
    createdAt: '2026-07-03T11:00:00Z',
    updatedAt: '2026-07-06T15:00:00Z',
    tags: ['email', 'notifiche'],
  },
  {
    id: 'KFT-006',
    requestType: 'Giacenza Articolo',
    customerName: 'Zeta Solutions S.r.l.',
    title: 'Richiesta nuova funzione: filtro per data',
    description: 'Gli utenti richiedono la possibilità di filtrare i ticket per intervallo di date nella vista lista.',
    status: 'closed',
    assignee: 'Andrea Ferri',
    reporter: 'Giulia Bianchi',
    createdAt: '2026-06-28T09:00:00Z',
    updatedAt: '2026-07-04T17:00:00Z',
    tags: ['feature', 'filtri'],
  },
]
