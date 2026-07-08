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
        <p className="text-neutral-500">Ticket non trovato.</p>
        <button onClick={() => navigate('/tickets')} className="mt-4 text-indigo-600 text-sm hover:underline">
          Torna alla lista
        </button>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate('/tickets')}
        className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Torna ai ticket
      </button>

      {/* Title */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-neutral-400">{ticket.id}</span>
            <h1 className="text-xl font-semibold text-neutral-900 mt-1">{ticket.title}</h1>
          </div>
          <div className="flex gap-2 shrink-0">
            <PriorityBadge priority={ticket.priority} />
            <StatusBadge status={ticket.status} />
          </div>
        </div>
        <p className="text-sm text-neutral-600 leading-relaxed">{ticket.description}</p>

        {/* Tags */}
        {ticket.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-3.5 h-3.5 text-neutral-400" />
            {ticket.tags.map((tag) => (
              <span key={tag} className="text-xs bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-3">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Dettagli</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-neutral-400" />
              <dt className="text-neutral-400 w-24">Assegnatario</dt>
              <dd className="text-neutral-700">{ticket.assignee || '—'}</dd>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-neutral-400" />
              <dt className="text-neutral-400 w-24">Segnalato da</dt>
              <dd className="text-neutral-700">{ticket.reporter}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              <dt className="text-neutral-400 w-24">Creato il</dt>
              <dd className="text-neutral-700">{new Date(ticket.createdAt).toLocaleString('it-IT')}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              <dt className="text-neutral-400 w-24">Aggiornato</dt>
              <dd className="text-neutral-700">{new Date(ticket.updatedAt).toLocaleString('it-IT')}</dd>
            </div>
          </dl>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-3">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Azioni</h2>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors text-neutral-700">
              Prendi in carico
            </button>
            <button className="w-full text-left px-3 py-2 text-sm rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors text-neutral-700">
              Segna come risolto
            </button>
            <button className="w-full text-left px-3 py-2 text-sm rounded-lg border border-red-100 hover:bg-red-50 transition-colors text-red-600">
              Chiudi ticket
            </button>
          </div>
        </div>
      </div>

      {/* Comments placeholder */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-4">Commenti</h2>
        <div className="text-center py-8 text-sm text-neutral-400">
          Nessun commento ancora. Aggiungi il primo!
        </div>
        <div className="flex gap-3 mt-4">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
            MR
          </div>
          <textarea
            placeholder="Scrivi un commento..."
            rows={3}
            className="flex-1 text-sm border border-neutral-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex justify-end mt-3">
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            Commenta
          </button>
        </div>
      </div>
    </div>
  )
}
