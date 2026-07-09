import { useNavigate } from 'react-router-dom'
import { PlusCircle, Clock, Ticket } from 'lucide-react'
import { mockTickets } from '@/data/mock-tickets'

const openCount = mockTickets.filter((t) => t.status === 'open').length
const inProgressCount = mockTickets.filter((t) => t.status === 'in_progress').length
const resolvedCount = mockTickets.filter((t) => t.status === 'resolved' || t.status === 'closed').length

const choices = [
  {
    id: 'new',
    icon: PlusCircle,
    label: 'Crea',
    color: '#009B9B',
    to: '/request-type',
  },
  {
    id: 'manage',
    icon: Ticket,
    label: 'Visualizza',
    badge: `${openCount + inProgressCount} aperte`,
    color: '#0078D4',
    to: '/dashboard?status=open',
  },
  {
    id: 'history',
    icon: Clock,
    label: 'Storico',
    badge: `${resolvedCount} chiuse`,
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
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="flex flex-col gap-8 items-center">
          {choices.map(({ id, icon: Icon, label, badge, color, to }) => (
            <button
              key={id}
              type="button"
              onClick={() => navigate(to)}
              className="flex flex-col items-center gap-3 group"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{ backgroundColor: `${color}18` }}
              >
                <Icon className="w-8 h-8" style={{ color }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#323130]">{label}</p>
                {badge && (
                  <p className="text-xs text-[#605E5C] mt-0.5">{badge}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
