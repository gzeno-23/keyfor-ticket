import { Bell } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserProfileMenu } from './UserProfileMenu'
import { resetNotificationsForDemo, useNotifications } from '@/lib/notifications'

export function TopNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { unreadCount } = useNotifications()
  const currentPath = `${location.pathname}${location.search}`
  const handleLogout = () => {
    resetNotificationsForDemo()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 bg-[#1F1F1F] pl-3 pr-6 h-14 flex items-center gap-1">
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
          title="Notifiche"
          onClick={() => navigate('/notifications', { state: { from: currentPath } })}
          className="relative flex h-8 w-8 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#D83B01]" />}
        </button>
        <UserProfileMenu accentColor="#009B9B" onLogout={handleLogout} />
      </div>
    </header>
  )
}
