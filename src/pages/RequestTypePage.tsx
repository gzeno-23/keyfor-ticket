import { useNavigate } from 'react-router-dom'
import { ChevronRight, Ticket } from 'lucide-react'
import { BackButton } from '@/components/ui/back-button'

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
    to: '/tickets/new?type=non-conformita',
  },
  {
    id: 'sollecito',
    label: 'Sollecito',
    color: '#FFB900',
    to: '/tickets/new?type=sollecito',
  },
  {
    id: 'giacenza',
    label: 'Giacenza Articolo',
    color: '#0078D4',
    to: '/tickets/new?type=giacenza',
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
        <div className="ml-auto">
          <div className="w-8 h-8 rounded-full bg-[#009B9B] flex items-center justify-center text-xs font-bold text-white select-none">
            MR
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 py-12">
        <div className="mb-8">
          <BackButton to="/hub" className="mt-0" />
          <h1 className="mt-3 text-3xl font-light text-[#323130]">Nuova richiesta</h1>
          <p className="mt-2 text-sm text-[#605E5C]">Scegli richiesta</p>
        </div>

        <div className="space-y-3 max-w-2xl">
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
                  Seleziona <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
