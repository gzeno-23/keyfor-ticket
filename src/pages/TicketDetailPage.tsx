import { useState, type ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Calendar, CheckCircle2, Edit, Tag, User, UserCheck, XCircle } from 'lucide-react'
import { mockTickets, type Status } from '@/data/mock-tickets'
import { StatusBadge } from '@/components/ui/badges'
import { BackButton } from '@/components/ui/back-button'

interface Comment {
  text: string
  author: string
  time: string
}

type TicketTab = 'details' | 'comments' | 'attachments'

export function TicketDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const ticket = mockTickets.find((item) => item.id === id)

  const [status, setStatus] = useState<Status>(ticket?.status ?? 'open')
  const [assignee, setAssignee] = useState(ticket?.assignee ?? '')
  const [comments, setComments] = useState<Comment[]>([])
  const [commentText, setCommentText] = useState('')
  const [activeTab, setActiveTab] = useState<TicketTab>('details')

  if (!ticket) {
    return (
      <div className="p-8 text-center">
        <p className="text-[#605E5C]">Ticket non trovato.</p>
        <button type="button" onClick={() => navigate('/tickets')} className="mt-4 text-sm text-[#009B9B] hover:underline">
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
  }

  const handleComment = () => {
    if (!commentText.trim()) return

    setComments((current) => [
      ...current,
      {
        text: commentText.trim(),
        author: 'Marco Rossi',
        time: new Date().toLocaleString('it-IT'),
      },
    ])
    setCommentText('')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
      <div className="flex flex-col gap-4 border-b border-[#EDEBE9] pb-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3 sm:gap-4">
          <BackButton to="/tickets" />
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#605E5C]">Ticket Card</p>
            <h1 className="mt-1 text-2xl font-light text-[#323130] md:text-[30px]">
              {ticket.requestType ?? ticket.title}
            </h1>
            <p className="mt-1 text-xs text-[#605E5C]">{ticket.id}</p>
          </div>
        </div>
        <div className="md:pt-1">
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[#EDEBE9] bg-white px-4 py-3 text-sm text-[#605E5C]">
        Segnalato: <span className="text-[#323130]">{ticket.reporter}</span>
        <span className="mx-2 hidden text-[#C8C6C4] sm:inline">|</span>
        Data: <span className="text-[#323130]">{new Date(ticket.createdAt).toLocaleDateString('it-IT')}</span>
      </div>

      <div className="mt-4 flex gap-4 overflow-x-auto border-b border-[#EDEBE9] text-sm">
        {[
          { id: 'details' as TicketTab, label: 'Dettagli' },
          { id: 'comments' as TicketTab, label: 'Commenti' },
          { id: 'attachments' as TicketTab, label: 'Allegati (0)' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`border-b-2 px-1 py-3 ${
              activeTab === tab.id ? 'border-[#009B9B] text-[#009B9B]' : 'border-transparent text-[#605E5C]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          {activeTab === 'details' && (
            <>
              <section>
                <h2 className="mb-4 text-base font-semibold text-[#323130]">Generale</h2>
                <div className="grid grid-cols-1 gap-x-8 gap-y-1 md:grid-cols-2">
                  <FieldRow label="Stato" value={<StatusBadge status={status} />} />
                  <FieldRow label="Segnalato da" value={ticket.reporter} />
                  <FieldRow label="Data creazione" value={new Date(ticket.createdAt).toLocaleString('it-IT')} />
                  <FieldRow label="Ultimo aggiornamento" value={new Date(ticket.updatedAt).toLocaleString('it-IT')} />
                  <FieldRow
                    label="Tag"
                    value={
                      <div className="flex flex-wrap gap-2">
                        {ticket.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    }
                  />
                </div>
              </section>

              <section>
                <h2 className="mb-4 text-base font-semibold text-[#323130]">Descrizione</h2>
                <div className="border-b border-dotted border-[#EDEBE9] py-2 text-sm leading-6 text-[#323130]">
                  {ticket.description}
                </div>
              </section>
            </>
          )}

          {activeTab === 'comments' && (
            <section>
              <h2 className="mb-4 text-base font-semibold text-[#323130]">Commenti</h2>

              {comments.length === 0 ? (
                <div className="border-b border-dotted border-[#EDEBE9] py-6 text-sm text-[#605E5C]">
                  Nessun commento presente.
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment, index) => (
                    <div key={`${comment.time}-${index}`} className="border-b border-dotted border-[#EDEBE9] pb-4">
                      <div className="mb-1 text-xs text-[#605E5C]">
                        {comment.author} · {comment.time}
                      </div>
                      <p className="text-sm text-[#323130]">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <label className="mb-2 block text-sm text-[#605E5C]">Nuovo commento</label>
                <textarea
                  placeholder="Scrivi un commento"
                  rows={4}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full border border-[#EDEBE9] bg-white px-3 py-2 text-sm text-[#323130] outline-none focus:border-[#009B9B]"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={handleComment}
                    disabled={!commentText.trim()}
                    className="bg-[#009B9B] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#007575] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Commenta
                  </button>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'attachments' && (
            <section>
              <h2 className="mb-4 text-base font-semibold text-[#323130]">Allegati</h2>
              <div className="border-b border-dotted border-[#EDEBE9] py-6 text-sm text-[#605E5C]">
                Nessun allegato presente.
              </div>
            </section>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-[#EDEBE9] bg-white p-4 xl:sticky xl:top-32">
          <h2 className="mb-4 text-sm font-semibold text-[#323130]">Azioni</h2>
          <div className="space-y-2">
            {status === 'open' && (
              <button
                type="button"
                onClick={() => navigate(`/tickets/${ticket.id}/edit`)}
                className="flex w-full items-center gap-2 border border-[#EDEBE9] px-3 py-2 text-sm text-[#323130] hover:bg-[#F3F2F1]"
              >
                <Edit className="h-4 w-4 text-[#009B9B]" />
                Modifica
              </button>
            )}
            <button
              type="button"
              onClick={handleTakeOver}
              disabled={status === 'in_progress' || status === 'resolved' || status === 'closed'}
              className="flex w-full items-center gap-2 border border-[#EDEBE9] px-3 py-2 text-sm text-[#323130] hover:bg-[#F3F2F1] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <UserCheck className="h-4 w-4 text-[#009B9B]" />
              Prendi in carico
            </button>
            <button
              type="button"
              onClick={handleResolve}
              disabled={status === 'resolved' || status === 'closed'}
              className="flex w-full items-center gap-2 border border-[#EDEBE9] px-3 py-2 text-sm text-[#323130] hover:bg-[#F3F2F1] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CheckCircle2 className="h-4 w-4 text-[#107C10]" />
              Segna come risolto
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={status === 'closed'}
              className="flex w-full items-center gap-2 border border-[#F3D6D8] px-3 py-2 text-sm text-[#A4262C] hover:bg-[#FDF3F4] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <XCircle className="h-4 w-4" />
              Chiudi ticket
            </button>
          </div>

          <div className="mt-6 border-t border-[#EDEBE9] pt-4 text-sm text-[#605E5C]">
            <div className="flex items-center gap-2 py-1">
              <User className="h-4 w-4" />
              <span>{assignee || 'In attesa di assegnazione'}</span>
            </div>
            <div className="flex items-center gap-2 py-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(ticket.updatedAt).toLocaleDateString('it-IT')}</span>
            </div>
            <div className="flex items-center gap-2 py-1">
              <Tag className="h-4 w-4" />
              <span>{ticket.tags.length} tag</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function FieldRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-dotted border-[#EDEBE9] py-2 sm:flex-row sm:items-center">
      <span className="w-32 shrink-0 text-sm text-[#605E5C] md:w-48">{label}</span>
      <span className="min-w-0 text-sm text-[#323130]">{value}</span>
    </div>
  )
}
