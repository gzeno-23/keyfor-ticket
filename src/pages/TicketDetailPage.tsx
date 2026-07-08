import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockTickets, type Status } from '@/data/mock-tickets'
import { StatusBadge, PriorityBadge } from '@/components/ui/badges'
import { ArrowLeft, User, Calendar, Tag, CheckCircle2, UserCheck, XCircle } from 'lucide-react'

interface Comment {
  text: string
  author: string
  time: string
}

export function TicketDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const ticket = mockTickets.find((t) => t.id === id)

  const [status, setStatus] = useState<Status>(ticket?.status ?? 'open')
  const [assignee, setAssignee] = useState(ticket?.assignee ?? '')
  const [comments, setComments] = useState<Comment[]>([])
  const [commentText, setCommentText] = useState('')
  const [closed, setClosed] = useState(false)

  if (!ticket) {
    return (
      <div className="p-8 text-center">
        <p className="text-[#605E5C]">Ticket non trovato.</p>
        <button
          onClick={() => navigate('/tickets')}
          className="mt-4 text-[#008272] text-sm hover:underline"
        >
          Torna alla lista
        </button>
      </div>
    )
  }

  const handleTakeOver = () => {
    setStatus('in_progress')
    setAssignee('Marco Rossi')
  }

  const handleResolve = () => {
    setStatus('resolved')
  }

  const handleClose = () => {
    setStatus('closed')
    setClosed(true)
  }

  const handleComment = () => {
    if (!commentText.trim()) return
    setComments([
      ...comments,
      {
        text: commentText.trim(),
        author: 'Marco Rossi',
        time: new Date().toLocaleString('it-IT'),
      },
    ])
    setCommentText('')
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
            <StatusBadge status={status} />
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
              <dd className="text-[#201F1E]">{assignee || '—'}</dd>
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
            <button
              onClick={handleTakeOver}
              disabled={status === 'in_progress' || status === 'resolved' || status === 'closed'}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-[#EDEBE9] hover:bg-[#F3F2F1] transition-colors text-[#201F1E] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <UserCheck className="w-4 h-4 text-[#008272]" />
              {status === 'in_progress' ? 'Già in lavorazione' : 'Prendi in carico'}
            </button>
            <button
              onClick={handleResolve}
              disabled={status === 'resolved' || status === 'closed'}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-[#EDEBE9] hover:bg-emerald-50 transition-colors text-[#201F1E] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {status === 'resolved' ? 'Già risolto' : 'Segna come risolto'}
            </button>
            <button
              onClick={handleClose}
              disabled={closed}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-red-100 hover:bg-red-50 transition-colors text-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <XCircle className="w-4 h-4" />
              {closed ? 'Ticket chiuso' : 'Chiudi ticket'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#EDEBE9] p-6">
        <h2 className="text-xs font-semibold text-[#A19F9D] uppercase tracking-wider mb-4">Commenti</h2>

        {comments.length === 0 ? (
          <div className="text-center py-8 text-sm text-[#A19F9D]">
            Nessun commento ancora. Aggiungi il primo!
          </div>
        ) : (
          <div className="space-y-4 mb-4">
            {comments.map((c, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#008272] flex items-center justify-center text-xs font-bold text-white shrink-0">
                  MR
                </div>
                <div className="flex-1 bg-[#F8F9FA] rounded-lg px-3 py-2">
                  <p className="text-xs text-[#A19F9D] mb-1">{c.author} · {c.time}</p>
                  <p className="text-sm text-[#201F1E]">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3 mt-4">
          <div className="w-8 h-8 rounded-full bg-[#008272] flex items-center justify-center text-xs font-bold text-white shrink-0">
            MR
          </div>
          <textarea
            placeholder="Scrivi un commento..."
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 text-sm border border-[#EDEBE9] rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#008272]"
          />
        </div>
        <div className="flex justify-end mt-3">
          <button
            onClick={handleComment}
            disabled={!commentText.trim()}
            className="px-4 py-2 bg-[#008272] text-white text-sm font-medium rounded-md hover:bg-[#006B5C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Commenta
          </button>
        </div>
      </div>
    </div>
  )
}
