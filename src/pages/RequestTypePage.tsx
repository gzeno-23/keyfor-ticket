import { useLocation, useNavigate } from 'react-router-dom'
import { MoveRight, Bell } from 'lucide-react'
import { BackButton } from '@/components/ui/back-button'
import { UserProfileMenu } from '@/components/layout/UserProfileMenu'
import { resetNotificationsForDemo, useNotifications } from '@/lib/notifications'

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
  const location = useLocation()
  const navigate = useNavigate()
  const { unreadCount } = useNotifications()
  const currentPath = `${location.pathname}${location.search}`
  const handleLogout = () => {
    resetNotificationsForDemo()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Top bar BC dark */}
      <header className="bg-[#1F1F1F] pl-3 pr-6 h-14 flex items-center gap-1">
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
        <div className="ml-auto flex items-center gap-0">
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
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-6 sm:px-6">
        <div className="pb-4">
          <div className="flex items-center gap-3">
            <BackButton to="/hub" />
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
        </div>
      </div>
    </div>
  )
}


