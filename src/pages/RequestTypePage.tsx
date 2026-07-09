import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { MoveRight, Bell } from 'lucide-react'
import { BackButton } from '@/components/ui/back-button'
import { UserProfileMenu } from '@/components/layout/UserProfileMenu'
import { resetNotificationsForDemo, useNotifications } from '@/lib/notifications'

type RequestArea = 'ordini' | 'magazzino' | 'logistica' | 'amministrazione'
type RequestTypeId =
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

const requestAreaTabs: { id: RequestArea; label: string }[] = [
  { id: 'ordini', label: 'Ordini' },
  { id: 'magazzino', label: 'Magazzino' },
  { id: 'logistica', label: 'Logistica' },
  { id: 'amministrazione', label: 'Amministrazione' },
]

const requestTypes: { id: RequestTypeId; label: string; color: string; to: string }[] = [
  {
    id: 'sposta-data',
    label: 'Sposta Data',
    color: '#009B9B',
    to: '/richieste/sposta-data',
  },
  {
    id: 'non-conformita',
    label: 'Non Conformità',
    color: '#D83B01',
    to: '/richieste/non-conformita',
  },
  {
    id: 'sollecito',
    label: 'Sollecito',
    color: '#FFB900',
    to: '/richieste/sollecito',
  },
  {
    id: 'giacenza-articolo',
    label: 'Giacenza Articolo',
    color: '#0078D4',
    to: '/richieste/giacenza-articolo',
  },
  {
    id: 'reso-merce',
    label: 'Reso Merce',
    color: '#5C2D91',
    to: '/richieste/reso-merce',
  },
  {
    id: 'variazione-prezzo',
    label: 'Variazione Prezzo',
    color: '#8764B8',
    to: '/richieste/variazione-prezzo',
  },
  {
    id: 'blocco-ordine',
    label: 'Blocco Ordine',
    color: '#D83B01',
    to: '/richieste/blocco-ordine',
  },
  {
    id: 'sblocco-ordine',
    label: 'Sblocco Ordine',
    color: '#498205',
    to: '/richieste/sblocco-ordine',
  },
  {
    id: 'verifica-pagamento',
    label: 'Verifica Pagamento',
    color: '#0078D4',
    to: '/richieste/verifica-pagamento',
  },
  {
    id: 'aggiornamento-anagrafica',
    label: 'Aggiornamento Anagrafica',
    color: '#00B7C3',
    to: '/richieste/aggiornamento-anagrafica',
  },
  {
    id: 'richiesta-fattura',
    label: 'Richiesta Fattura',
    color: '#986F0B',
    to: '/richieste/richiesta-fattura',
  },
  {
    id: 'reclamo-trasporto',
    label: 'Reclamo Trasporto',
    color: '#A4262C',
    to: '/richieste/reclamo-trasporto',
  },
  {
    id: 'priorita-consegna',
    label: 'Priorità Consegna',
    color: '#038387',
    to: '/richieste/priorita-consegna',
  },
  {
    id: 'richiesta-documenti',
    label: 'Richiesta Documenti',
    color: '#8764B8',
    to: '/richieste/richiesta-documenti',
  },
  {
    id: 'cambio-vettore',
    label: 'Cambio Vettore',
    color: '#107C10',
    to: '/richieste/cambio-vettore',
  },
]

const requestTypeByArea: Record<RequestArea, RequestTypeId[]> = {
  ordini: [
    'sposta-data',
    'non-conformita',
    'sollecito',
    'giacenza-articolo',
    'reso-merce',
    'variazione-prezzo',
    'blocco-ordine',
    'sblocco-ordine',
    'verifica-pagamento',
    'aggiornamento-anagrafica',
    'richiesta-fattura',
    'reclamo-trasporto',
    'priorita-consegna',
    'richiesta-documenti',
    'cambio-vettore',
  ],
  magazzino: [
    'non-conformita',
    'giacenza-articolo',
    'sblocco-ordine',
    'verifica-pagamento',
    'richiesta-documenti',
    'reso-merce',
  ],
  logistica: [
    'sposta-data',
    'sollecito',
    'reclamo-trasporto',
    'priorita-consegna',
    'cambio-vettore',
    'richiesta-documenti',
  ],
  amministrazione: [
    'verifica-pagamento',
    'aggiornamento-anagrafica',
    'richiesta-fattura',
    'variazione-prezzo',
    'blocco-ordine',
    'sblocco-ordine',
  ],
}

export function RequestTypePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { unreadCount } = useNotifications()
  const [activeArea, setActiveArea] = useState<RequestArea>('ordini')
  const currentPath = `${location.pathname}${location.search}`
  const activeRequestTypeIds = requestTypeByArea[activeArea]
  const filteredRequestTypes = requestTypes.filter((request) => activeRequestTypeIds.includes(request.id))
  const handleLogout = () => {
    resetNotificationsForDemo()
    navigate('/login')
  }

  return (
    <div className="h-screen overflow-hidden bg-[#F8F9FA] flex flex-col">
      {/* Top bar BC dark */}
      <header className="shrink-0 bg-[#1F1F1F] pl-3 pr-6 h-14 flex items-center gap-1">
        <div className="w-14 h-14 flex items-center justify-center shrink-0">
          <img
            src={`${import.meta.env.BASE_URL}login-symbol.png`}
            alt=""
            className="h-12 w-12 object-contain brightness-0 invert"
          />
        </div>
        <button
          type="button"
          onClick={() => navigate('/hub')}
          className="font-semibold text-white text-sm tracking-wide hover:text-white/90 transition-colors"
        >
          Key Ticket
        </button>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/notifications', { state: { from: currentPath } })}
            className="relative flex h-8 w-8 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#D83B01]" />}
          </button>
          <UserProfileMenu accentColor="#009B9B" onLogout={handleLogout} />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-2xl flex-col px-4 pb-6 sm:px-6">
          <div className="sticky top-0 z-20 bg-[#F8F9FA] pt-6">
            <div className="pb-4">
              <div className="flex items-center gap-3">
                <BackButton to="/hub" />
                <div>
                  <h1 className="text-3xl font-light text-[#323130]">Nuova richiesta</h1>
                  <p className="mt-2 text-sm text-[#605E5C]">Seleziona una tipologia di richiesta</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-6 overflow-x-auto text-sm">
              {requestAreaTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveArea(tab.id)}
                  className={`shrink-0 border-b-2 px-1 py-3 ${
                    activeArea === tab.id ? 'border-[#009B9B] text-[#009B9B]' : 'border-transparent text-[#605E5C]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="h-1 w-full bg-[#C8C6C4]" />
          </div>

          <div className="mt-5 space-y-5">
            {filteredRequestTypes.map(({ id, label, color, to }) => (
              <button
                key={id}
                type="button"
                onClick={() => navigate(to)}
                className="w-full bg-white border border-[#EDEBE9] hover:border-[#009B9B] hover:shadow-md transition-all duration-200"
              >
                <div className="h-1.5 w-full" style={{ backgroundColor: color }} />
                <div className="flex items-center justify-between p-4">
                  <p className="text-base font-medium text-[#323130] text-left">{label}</p>
                  <div
                    className="flex items-center gap-2 text-sm font-medium flex-shrink-0"
                    style={{ color }}
                  >
                    Seleziona <MoveRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>
            ))}
            {filteredRequestTypes.length === 0 && (
              <div className="rounded-xl border border-[#EDEBE9] bg-white p-4 text-sm text-[#605E5C]">
                Nessuna tipologia disponibile in questa area.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
