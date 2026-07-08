import { useNavigate } from 'react-router-dom'
import { PlusCircle, Edit3, Clock, ChevronRight, Ticket } from 'lucide-react'
import { mockTickets } from '@/data/mock-tickets'

const openCount = mockTickets.filter((t) => t.status === 'open').length
const inProgressCount = mockTickets.filter((t) => t.status === 'in_progress').length
const resolvedCount = mockTickets.filter((t) => t.status === 'resolved' || t.status === 'closed').length

const choices = [
  {
    id: 'new',
    icon: PlusCircle,
    label: 'Crea nuovo ticket',
    description: 'Apri una nuova segnalazione o richiesta di supporto',
    badge: null,
    color: '#009B9B',
    to: '/tickets/new',
  },
  {
    id: 'manage',
    icon: Edit3,
    label: 'Gestisci ticket',
    description: 'Visualizza, modifica e aggiorna i ticket esistenti',
    badge: `${openCount + inProgressCount} aperti`,
    color: '#0078D4',
    to: '/tickets',
  },
  {
    id: 'history',
    icon: Clock,
    label: 'Storico ticket',
    description: 'Consulta lo storico di tutti i ticket risolti e chiusi',
    badge: `${resolvedCount} chiusi`,
    color: '#5C2E91',
    to: '/tickets?status=resolved',
  },
]

export function HubPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Top bar minimal */}
      <header className="bg-white border-b border-[#EDEBE9] px-8 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-[#009B9B] flex items-center justify-center">
          <Ticket className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-[#323130] text-sm">KeyFor Ticket</span>
        <span className="text-[#C8C6C4] mx-1">|</span>
        <span className="text-sm text-[#605E5C]">Seleziona operazione</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#009B9B] flex items-center justify-center text-xs font-bold text-white">
            MR
          </div>
          <span className="text-sm text-[#605E5C]">Marco Rossi</span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.18em] text-[#605E5C] mb-2">Benvenuto</p>
          <h1 className="text-3xl font-light text-[#323130]">Cosa vuoi fare?</h1>
          <p className="text-sm text-[#605E5C] mt-2">Seleziona un'operazione per continuare</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-3xl">
          {choices.map(({ id, icon: Icon, label, description, badge, color, to }) => (
            <button
              key={id}
              type="button"
              onClick={() => navigate(to)}
              className="group text-left bg-white border border-[#EDEBE9] hover:border-[#009B9B] hover:shadow-md transition-all duration-200 flex flex-col"
            >
              {/* Color strip */}
              <div className="h-1.5 w-full" style={{ backgroundColor: color }} />

              <div className="p-6 flex flex-col gap-4 flex-1">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>

                <div className="flex-1">
                  <p className="text-base font-semibold text-[#323130]">{label}</p>
                  <p className="text-sm text-[#605E5C] mt-1 leading-relaxed">{description}</p>
                </div>

                {badge && (
                  <span
                    className="self-start text-xs font-medium px-2 py-1"
                    style={{ backgroundColor: `${color}18`, color }}
                  >
                    {badge}
                  </span>
                )}

                <div className="flex items-center gap-1 text-sm font-medium mt-1 group-hover:gap-2 transition-all" style={{ color }}>
                  Apri <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="mt-10 text-sm text-[#605E5C] hover:text-[#009B9B] transition-colors"
        >
          Vai alla Dashboard →
        </button>
      </div>
    </div>
  )
}
