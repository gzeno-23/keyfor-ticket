import { useLocation, useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { UserProfileMenu } from '@/components/layout/UserProfileMenu'
import { resetNotificationsForDemo, useNotifications } from '@/lib/notifications'

const choices = [
  {
    id: 'new',
    iconSrc: `${import.meta.env.BASE_URL}hub-create.svg`,
    label: 'Crea nuova richiesta',
    color: '#00828E',
    to: '/request-type',
  },
  {
    id: 'manage',
    iconSrc: `${import.meta.env.BASE_URL}hub-view.svg`,
    label: 'Visualizza richieste aperte',
    color: '#FFB900',
    to: '/dashboard?status=open',
  },
  {
    id: 'history',
    iconSrc: `${import.meta.env.BASE_URL}hub-archive.svg`,
    label: 'Storico richieste',
    color: '#D8453C',
    to: '/tickets?status=resolved',
  },
]

export function HubPage() {
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
      {/* Top bar — BC dark style */}
      <header className="bg-[#1F1F1F] pl-3 pr-6 py-0 h-14 flex items-center gap-1">
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
          <UserProfileMenu accentColor="#00828E" onLogout={handleLogout} />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col w-full">
        {choices.map(({ id, iconSrc, label, color, to }) => (
          <button
            key={id}
            type="button"
            onClick={() => navigate(to)}
            className="flex-1 w-full transition-all duration-200 hover:brightness-95"
            style={{ backgroundColor: color }}
          >
            <div className="h-full w-full flex flex-col items-center justify-center gap-4 py-6">
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
                <img src={iconSrc} alt="" className="h-10 w-10" />
              </div>
              <p className="text-base sm:text-lg font-bold text-white">{label}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
