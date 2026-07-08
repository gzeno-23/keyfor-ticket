import { useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import type { Priority, Status } from '@/data/mock-tickets'

export function NewTicketPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium' as Priority,
    status: 'open' as Status,
    assignee: '',
    tags: '',
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/tickets/new/review', { state: { ticket: form } })
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#EDEBE9] pb-4">
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={() => navigate('/tickets')}
            className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-[#EDEBE9] bg-white text-[#323130] hover:bg-[#F3F2F1]"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#605E5C]">Nuovo documento</p>
            <h1 className="mt-1 text-[30px] font-light text-[#323130]">Nuovo Ticket</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/tickets')}
            className="border border-[#EDEBE9] px-4 py-2 text-sm text-[#605E5C] hover:bg-[#F3F2F1]"
          >
            Annulla
          </button>
          <button
            type="submit"
            form="new-ticket-form"
            className="bg-[#009B9B] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#007575]"
          >
            Salva
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 bg-[#009B9B] px-4 py-3 text-sm text-white">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <p>Completa i dati del ticket. Alla schermata successiva potrai confermare il documento prima del salvataggio finale.</p>
      </div>

      <div className="mt-4 border-b border-[#EDEBE9] text-sm">
        <button type="button" className="border-b-2 border-[#009B9B] px-1 py-3 text-[#009B9B]">
          Generale
        </button>
      </div>

      <form id="new-ticket-form" onSubmit={handleSubmit} className="mt-6 space-y-8">
        <section>
          <h2 className="mb-4 text-base font-semibold text-[#323130]">Generale</h2>
          <div className="grid gap-x-8 gap-y-1 md:grid-cols-2">
            <EditField
              label="Titolo"
              required
              input={
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Descrivi brevemente il problema"
                  className="w-full bg-transparent text-sm text-[#323130] outline-none placeholder:text-[#A19F9D]"
                />
              }
            />
            <EditField
              label="Assegnatario"
              input={
                <select
                  value={form.assignee}
                  onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                  className="w-full bg-transparent text-sm text-[#323130] outline-none"
                >
                  <option value="">—</option>
                  <option value="Marco Rossi">Marco Rossi</option>
                  <option value="Laura Conti">Laura Conti</option>
                  <option value="Andrea Ferri">Andrea Ferri</option>
                </select>
              }
            />
            <EditField
              label="Priorità"
              input={
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
                  className="w-full bg-transparent text-sm text-[#323130] outline-none"
                >
                  <option value="low">Bassa</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                  <option value="critical">Critica</option>
                </select>
              }
            />
            <EditField
              label="Stato iniziale"
              input={
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
                  className="w-full bg-transparent text-sm text-[#323130] outline-none"
                >
                  <option value="open">Aperto</option>
                  <option value="in_progress">In lavorazione</option>
                </select>
              }
            />
            <EditField
              label="Tag"
              input={
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="bug, ui, urgente"
                  className="w-full bg-transparent text-sm text-[#323130] outline-none placeholder:text-[#A19F9D]"
                />
              }
            />
            <EditField label="Segnalato da" input={<span className="text-sm text-[#323130]">Marco Rossi</span>} />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-base font-semibold text-[#323130]">Descrizione</h2>
          <div className="border-b border-dotted border-[#EDEBE9] py-1.5">
            <textarea
              rows={6}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Inserisci dettagli, impatto e passi per riprodurre il problema"
              className="w-full resize-none bg-transparent text-sm text-[#323130] outline-none placeholder:text-[#A19F9D]"
            />
          </div>
        </section>
      </form>
    </div>
  )
}

function EditField({
  label,
  input,
  required = false,
}: {
  label: string
  input: ReactNode
  required?: boolean
}) {
  return (
    <div className="flex items-center border-b border-dotted border-[#EDEBE9] py-1.5">
      <span className="w-48 shrink-0 text-sm text-[#605E5C]">
        {label}
        {required ? ' *' : ''}
      </span>
      <div className="min-w-0 flex-1">{input}</div>
    </div>
  )
}
