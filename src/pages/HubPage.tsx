import { useNavigate } from 'react-router-dom'
import { PlusCircle, Clock, Ticket, Eye } from 'lucide-react'

const choices = [
  {
    id: 'new',
    icon: PlusCircle,
    label: 'Crea nuova richiesta',
    color: '#009B9B',
    to: '/request-type',
  },
  {
    id: 'manage',
    icon: Eye,
    label: 'Visualizza richieste aperte',
    color: '#0078D4',
    to: '/dashboard?status=open',
  },
  {
    id: 'history',
    icon: Clock,
    label: 'Storico richieste',
    color: '#5C2E91',
    to: '/tickets?status=resolved',
  },
]

export function HubPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Top bar — BC dark style */}
      <header className="bg-[#1F1F1F] px-6 py-0 h-12 flex items-center gap-3">
        <div className="w-7 h-7 rounded-sm bg-[#009B9B] flex items-center justify-center">
          <Ticket className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-white text-sm tracking-wide">Key Ticket</span>
        <div className="ml-auto">
          <div className="w-8 h-8 rounded-full bg-[#009B9B] flex items-center justify-center text-xs font-bold text-white select-none">
            MR
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col w-full">
        {choices.map(({ id, icon: Icon, label, color, to }) => (
          <button
            key={id}
            type="button"
            onClick={() => navigate(to)}
            className="flex-1 w-full border-b border-white/50 transition-all duration-200 hover:brightness-95"
            style={{ backgroundColor: `${color}1F` }}
          >
            <div className="h-full w-full flex flex-col items-center justify-center gap-4 py-6">
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
                <Icon className="w-10 h-10" style={{ color }} />
              </div>
              <p className="text-base sm:text-lg font-semibold text-[#323130]">{label}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
