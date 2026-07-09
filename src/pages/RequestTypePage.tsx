import { useNavigate } from 'react-router-dom'
import { ChevronRight, Ticket, Bell, LogOut } from 'lucide-react'
import { BackButton } from '@/components/ui/back-button'
import { RequestTypeLabel } from '@/components/ui/request-type-label'

const requestTypes = [
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
    id: 'giacenza',
    label: 'Giacenza Articolo',
    color: '#0078D4',
    to: '/richieste/giacenza-articolo',
  },
]

export function RequestTypePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Top bar BC dark */}
      <header className="bg-[#1F1F1F] px-6 h-12 flex items-center gap-3">
        <div className="w-7 h-7 rounded-sm bg-[#009B9B] flex items-center justify-center">
          <Ticket className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-white text-sm tracking-wide">Key Ticket</span>
        <div className="ml-auto flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => navigate('/notifications')}
            className="flex h-8 w-8 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Bell className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            title="Log Out"
            className="flex h-8 w-8 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#009B9B] flex items-center justify-center text-xs font-bold text-white select-none">
            MR
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-6 sm:px-6">
        <div className="pb-4">
          <div className="flex items-center gap-3">
            <BackButton to="/hub" className="mt-0 h-8 w-8 [&>svg]:h-3 [&>svg]:w-3" />
            <div>
              <h1 className="text-3xl font-light text-[#323130]">Nuova richiesta</h1>
              <p className="mt-2 text-sm text-[#605E5C]">Seleziona una tipologia di richiesta</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {requestTypes.map(({ id, label, color, to }) => (
            <button
              key={id}
              type="button"
              onClick={() => navigate(to)}
              className="w-full bg-white border border-[#EDEBE9] hover:border-[#009B9B] hover:shadow-md transition-all duration-200"
            >
              <div className="h-1.5 w-full" style={{ backgroundColor: color }} />
              <div className="flex items-center justify-between p-4">
                <RequestTypeLabel
                  label={label}
                  color={color}
                  textClassName="text-base font-medium text-[#323130] text-left"
                  lineClassName="h-0.5"
                />
                <div
                  className="flex items-center gap-2 text-sm font-medium flex-shrink-0"
                  style={{ color }}
                >
                  Seleziona <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
