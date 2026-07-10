import { useState } from 'react'
import { ArrowLeft, Bell, Settings } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserProfileMenu } from './UserProfileMenu'
import { resetNotificationsForDemo, useNotifications } from '@/lib/notifications'

export function TopNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { unreadCount } = useNotifications()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
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
        <button
          type="button"
          title="Impostazioni"
          onClick={() => setIsSettingsOpen(true)}
          className="relative flex h-8 w-8 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Settings className="h-4 w-4" />
        </button>
        <UserProfileMenu accentColor="#009B9B" onLogout={handleLogout} />
      </div>

      {isSettingsOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/30 p-4" onClick={() => setIsSettingsOpen(false)}>
          <div
            className="w-full max-w-md rounded-lg border border-[#EDEBE9] bg-white p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsSettingsOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#EDEBE9] text-[#605E5C] hover:bg-[#F3F2F1]"
              aria-label="Chiudi impostazioni"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <h2 className="mt-3 text-lg font-semibold text-[#201F1E]">Impostazioni</h2>
            <div className="mt-4 min-h-16 rounded-md border border-dashed border-[#EDEBE9] bg-[#FAF9F8] p-3 text-sm text-[#605E5C]">
              Opzioni in arrivo.
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
