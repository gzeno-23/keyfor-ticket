import { Bell, Ticket, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function TopNav() {
  const navigate = useNavigate()

  return (
    <header className="bg-[#1F1F1F] px-6 h-12 flex items-center gap-3">
      <div className="w-7 h-7 rounded-sm bg-[#009B9B] flex items-center justify-center">
        <Ticket className="w-4 h-4 text-white" />
      </div>
      <span className="font-semibold text-white text-sm tracking-wide">Key Ticket</span>
      <div className="ml-auto flex items-center gap-0.5">
        <button
          type="button"
          title="Notifiche"
          onClick={() => navigate('/notifications')}
          className="flex h-8 w-8 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Bell className="h-4 w-4" />
        </button>
        <button
          type="button"
          title="Log Out"
          onClick={() => navigate('/login')}
          className="flex h-8 w-8 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
        </button>
        <div className="w-8 h-8 rounded-full bg-[#009B9B] flex items-center justify-center text-xs font-bold text-white select-none">
          MR
        </div>
      </div>
    </header>
  )
}
