import { useParams, useNavigate } from 'react-router-dom'
import { mockTickets } from '@/data/mock-tickets'
import { StatusBadge, PriorityBadge } from '@/components/ui/badges'
import { ArrowLeft, User, Calendar, Tag } from 'lucide-react'

export function TicketDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const ticket = mockTickets.find((t) => t.id === id)

  if (!ticket) {
    return (
      <div className="p-8 text-center">
        <p className="text-[#605E5C]">Ticket non trovato.</p>
        <button
          onClick={() => navigate('/tickets')}
          className="mt-4 text-[#0070F2] text-sm hover:underline"
        >
          Torna alla lista
        </button>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <button
        onClick={() => navigate('/tickets')}
        className="flex items-center gap-1.5 text-sm text-[#605E5C] hover:text-[#201F1E] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Torna ai ticket
      </button>

      <div className="bg-white rounded-lg border border-[#EDEBE9] p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-[#A19F9D]">{ticket.id}</span>
            <h1 className="text-xl font-semibold text-[#201F1E] mt-1">{ticket.title}</h1>
          </div>
          <div className="flex gap-2 shrink-0">
            <PriorityBadge priority={ticket.priority} />
            <StatusBadge status={ticket.status} />
          </div>
        </div>
        <p className="text-sm text-[#605E5C] leading-relaxed">{ticket.description}</p>

        {ticket.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-3.5 h-3.5 text-[#A19F9D]" />
            {ticket.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-[#F3F2F1] text-[#605E5C] px-2 py-0.5 rounded-full border border-[#EDEBE9]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-[#EDEBE9] p-5 space-y-3">
          <h2 className="text-xs font-semibold text-[#A19F9D] uppercase tracking-wider">Dettagli</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#A19F9D]" />
              <dt className="text-[#A19F9D] w-24">Assegnatario</dt>
              <dd className="text-[#201F1E]">{ticket.assignee || '—'}</dd>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#A19F9D]" />
              <dt className="text-[#A19F9D] w-24">Segnalato da</dt>
              <dd className="text-[#201F1E]">{ticket.reporter}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#A19F9D]" />
              <dt className="text-[#A19F9D] w-24">Creato il</dt>
              <dd className="text-[#201F1E]">{new Date(ticket.createdAt).toLocaleString('it-IT')}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#A19F9D]" />
              <dt className="text-[#A19F9D] w-24">Aggiornato</dt>
              <dd className="text-[#201F1E]">{new Date(ticket.updatedAt).toLocaleString('it-IT')}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white rounded-lg border border-[#EDEBE9] p-5 space-y-3">
          <h2 className="text-xs font-semibold text-[#A19F9D] uppercase tracking-wider">Azioni</h2>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm rounded-md border border-[#EDEBE9] hover:bg-[#F3F2F1] transition-colors text-[#201F1E]">
              Prendi in carico
            </button>
            <button className="w-full text-left px-3 py-2 text-sm rounded-md border border-[#EDEBE9] hover:bg-[#F3F2F1] transition-colors text-[#201F1E]">
              Segna come risolto
            </button>
            <button className="w-full text-left px-3 py-2 text-sm rounded-md border border-red-100 hover:bg-red-50 transition-colors text-red-600">
              Chiudi ticket
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#EDEBE9] p-6">
        <h2 className="text-xs font-semibold text-[#A19F9D] uppercase tracking-wider mb-4">Commenti</h2>
        <div className="text-center py-8 text-sm text-[#A19F9D]">
          Nessun commento ancora. Aggiungi il primo!
        </div>
        <div className="flex gap-3 mt-4">
          <div className="w-8 h-8 rounded-full bg-[#0070F2] flex items-center justify-center text-xs font-bold text-white shrink-0">
            MR
          </div>
          <textarea
            placeholder="Scrivi un commento..."
            rows={3}
            className="flex-1 text-sm border border-[#EDEBE9] rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#0070F2]"
          />
        </div>
        <div className="flex justify-end mt-3">
          <button className="px-4 py-2 bg-[#0070F2] text-white text-sm font-medium rounded-md hover:bg-[#0062D9] transition-colors">
            Commenta
          </button>
        </div>
      </div>
    </div>
  )
}
