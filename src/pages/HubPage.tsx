import { useNavigate } from 'react-router-dom'
import { Ticket, Bell, LogOut } from 'lucide-react'

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
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Top bar — BC dark style */}
      <header className="bg-[#1F1F1F] px-6 py-0 h-12 flex items-center gap-3">
        <div className="w-7 h-7 rounded-sm bg-[#00828E] flex items-center justify-center">
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
          <div className="w-8 h-8 rounded-full bg-[#00828E] flex items-center justify-center text-xs font-bold text-white select-none">
            MR
          </div>
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
              <p className="text-base sm:text-lg font-semibold text-white">{label}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
