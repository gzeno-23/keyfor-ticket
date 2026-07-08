import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { StatusBadge, PriorityBadge } from '@/components/ui/badges'
import type { Priority, Status } from '@/data/mock-tickets'
import { ArrowLeft, Save, X, User, Tag, AlertCircle } from 'lucide-react'

interface TicketDraft {
  title: string
  description: string
  priority: Priority
  status: Status
  assignee: string
  tags: string
}

const priorityLabel: Record<Priority, string> = {
  low: 'Bassa',
  medium: 'Media',
  high: 'Alta',
  critical: 'Critica',
}

export function TicketReviewPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const draft = location.state?.ticket as TicketDraft | undefined

  useEffect(() => {
    if (!draft) navigate('/tickets/new', { replace: true })
  }, [draft, navigate])

  if (!draft) return null

  const tags = draft.tags
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

  const now = new Date().toLocaleString('it-IT')
  const newId = `KFT-00${Math.floor(Math.random() * 90) + 10}`

  const handleSave = () => {
    // Mock save — in una vera app qui si chiamerebbe l'API
    navigate('/tickets', { replace: true })
  }

  return (
    <div className="p-8 max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-[#605E5C] mb-1">Nuovo ticket · Anteprima</p>
          <h1 className="text-2xl font-semibold text-[#201F1E]">Conferma e salva</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#605E5C] border border-[#EDEBE9] rounded-md hover:bg-[#F3F2F1] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Modifica
          </button>
          <button
            onClick={() => navigate('/tickets')}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-600 border border-red-100 rounded-md hover:bg-red-50 transition-colors"
          >
            <X className="w-4 h-4" />
            Annulla
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#0070F2] text-white rounded-md hover:bg-[#0062D9] transition-colors"
          >
            <Save className="w-4 h-4" />
            Salva Ticket
          </button>
        </div>
      </div>

      {/* Ticket header card */}
      <div className="bg-white rounded-lg border border-[#EDEBE9] p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-[#605E5C]">{newId} · Bozza</span>
            <h2 className="text-xl font-semibold text-[#201F1E] mt-1">{draft.title || '—'}</h2>
          </div>
          <div className="flex gap-2 shrink-0">
            <PriorityBadge priority={draft.priority} />
            <StatusBadge status={draft.status} />
          </div>
        </div>

        {draft.description ? (
          <p className="text-sm text-[#605E5C] leading-relaxed">{draft.description}</p>
        ) : (
          <p className="text-sm text-[#A19F9D] italic">Nessuna descrizione fornita.</p>
        )}

        {tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-3.5 h-3.5 text-[#A19F9D]" />
            {tags.map((tag) => (
              <span key={tag} className="text-xs bg-[#F3F2F1] text-[#605E5C] px-2 py-0.5 rounded-full border border-[#EDEBE9]">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left: metadata */}
        <div className="bg-white rounded-lg border border-[#EDEBE9] p-5 space-y-4">
          <h3 className="text-xs font-semibold text-[#A19F9D] uppercase tracking-wider">Dettagli</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-[#A19F9D] mt-0.5 shrink-0" />
              <div>
                <dt className="text-xs text-[#A19F9D]">Priorità</dt>
                <dd className="text-[#201F1E] font-medium mt-0.5">{priorityLabel[draft.priority]}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-[#A19F9D] mt-0.5 shrink-0" />
              <div>
                <dt className="text-xs text-[#A19F9D]">Assegnatario</dt>
                <dd className="text-[#201F1E] font-medium mt-0.5">{draft.assignee || '—'}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-[#A19F9D] mt-0.5 shrink-0" />
              <div>
                <dt className="text-xs text-[#A19F9D]">Segnalato da</dt>
                <dd className="text-[#201F1E] font-medium mt-0.5">Marco Rossi</dd>
              </div>
            </div>
          </dl>
        </div>

        {/* Right: timestamps */}
        <div className="bg-white rounded-lg border border-[#EDEBE9] p-5 space-y-4">
          <h3 className="text-xs font-semibold text-[#A19F9D] uppercase tracking-wider">Informazioni</h3>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs text-[#A19F9D]">Data creazione</dt>
              <dd className="text-[#201F1E] font-medium mt-0.5">{now}</dd>
            </div>
            <div>
              <dt className="text-xs text-[#A19F9D]">ID assegnato</dt>
              <dd className="text-[#201F1E] font-mono font-medium mt-0.5">{newId}</dd>
            </div>
            <div>
              <dt className="text-xs text-[#A19F9D]">Stato iniziale</dt>
              <dd className="mt-0.5"><StatusBadge status={draft.status} /></dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 text-sm font-medium text-[#605E5C] border border-[#EDEBE9] rounded-md hover:bg-[#F3F2F1] transition-colors"
        >
          ← Torna al form
        </button>
        <button
          onClick={() => navigate('/tickets')}
          className="px-5 py-2.5 text-sm font-medium text-red-600 border border-red-100 rounded-md hover:bg-red-50 transition-colors"
        >
          Annulla
        </button>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 text-sm font-medium bg-[#0070F2] text-white rounded-md hover:bg-[#0062D9] transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Salva Ticket
        </button>
      </div>
    </div>
  )
}
